"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _errors = require("../defines/errors");

var _response = require("../defines/response");

var _constants = require("../defines/constants");

var _config = require("../config");

var _services = require("../services");

var _fields = require("../utils/fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const {
  JWT
} = _config.PASSPORT;
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
router.post('/sign-in', (req, res, next) => {
  _passport.default.authenticate('local', {
    session: false
  }, (err, user, info) => {
    if (err) {
      req.error = new _errors.LMSError(500, err);
      return next();
    }

    if (!user) {
      return res.status(200).json(new _response.LMSResponse(null, {
        token: null,
        message: 'Your account is incorrect',
        role: null
      }));
    }

    if (!user.isAccepted) {
      return res.status(200).json(new _response.LMSResponse(null, {
        token: null,
        role: null,
        message: 'Your account has not accepted by Admin'
      }));
    }

    req.logIn(user, {
      session: false
    }, err => {
      if (err) {
        req.error = new _errors.LMSError(500, err);
        return next();
      }

      return res.status(200).json(new _response.LMSResponse(null, {
        token: _jsonwebtoken.default.sign(user, JWT.SECRET),
        role: _config.USER_ROLES[user.role],
        message: 'Sign in successfully'
      }));
    });
  })(req, res, next);
});
router.post('/sign-up-member', async (req, res, next) => {
  const data = req.body;

  if (!(0, _fields.isEnoughFields)(data, _constants.REQUIRE_MEMBER_SIGN_UP_FIELDS)) {
    req.error = new _errors.LMSError(400, 'Bad request');
    return next();
  }

  if (await _services.userService.isExists(data.username)) {
    return res.status(200).json(new _response.LMSResponse(null, {
      status: false,
      message: 'username have exists'
    }));
  }

  _services.userService.createOne(data).then(user => {
    if (user) {
      return res.status(200).json(new _response.LMSResponse(null, {
        data: {
          status: true
        }
      }));
    }

    res.status(200).json(new _response.LMSResponse(null, {
      data: {
        status: false
      }
    }));
  }).catch(err => {
    req.error = new _errors.LMSError(500, err);
    next();
  });
});
router.post('/sign-up-lab', async (req, res, next) => {
  const {
    user,
    lab
  } = req.body;

  if (!((0, _fields.isEnoughFields)(user, _constants.REQUIRE_ADMIN_LAB_SIGN_UP_FIELDS) && (0, _fields.isEnoughFields)(lab, _constants.REQUIRE_LAB_SIGN_UP_FIELDS))) {
    req.error = new _errors.LMSError(400, 'Bad request');
    return next();
  }

  if (await _services.userService.isExists(user.username)) {
    return res.status(200).json(new _response.LMSResponse(null, {
      status: false,
      message: 'username have exists'
    }));
  }

  _services.userService.signUpLab(user, lab).then(({
    usr,
    lab
  }) => {
    if (!user || !lab) {
      return res.status(200).json(new _response.LMSResponse(null, {
        status: false
      }));
    }

    res.status(200).json(new _response.LMSResponse(null, {
      status: true
    }));
  }).catch(err => {
    req.error = new _errors.LMSError(500, err);
    next();
  });
});
router.post('/check-exists-username', async (req, res, next) => {
  const flag = await _services.userService.isExists(req.body.username);
  res.status(200).json(new _response.LMSResponse(null, {
    exists: flag
  }));
});
const userRouter = router;
exports.userRouter = userRouter;