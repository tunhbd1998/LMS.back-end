import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { LMSError } from '../defines/errors';
import { LMSResponse } from '../defines/response';
import {
  REQUIRE_MEMBER_SIGN_UP_FIELDS,
  REQUIRE_ADMIN_LAB_SIGN_UP_FIELDS,
  REQUIRE_LAB_SIGN_UP_FIELDS,
} from '../defines/constants';
import { PASSPORT, USER_ROLES } from '../config';
import { userService } from '../services';
import { isEnoughFields } from '../utils/fields';

const router = express.Router();
const { JWT } = PASSPORT;

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/sign-in', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      req.error = new LMSError(500, err);
      return next();
    }

    if (!user) {
      return res.status(200).json(
        new LMSResponse(null, {
          token: null,
          message: 'Your account is incorrect',
          role: null,
        })
      );
    }

    if (!user.isAccepted) {
      return res.status(200).json(
        new LMSResponse(null, {
          token: null,
          role: null,
          message: 'Your account has not accepted by Admin',
        })
      );
    }

    req.logIn(user, { session: false }, err => {
      if (err) {
        req.error = new LMSError(500, err);
        return next();
      }

      return res.status(200).json(
        new LMSResponse(null, {
          token: jwt.sign(user, JWT.SECRET),
          role: USER_ROLES[user.role],
          message: 'Sign in successfully',
        })
      );
    });
  })(req, res, next);
});

router.post('/sign-up-member', async (req, res, next) => {
  const data = req.body;

  if (!isEnoughFields(data, REQUIRE_MEMBER_SIGN_UP_FIELDS)) {
    req.error = new LMSError(400, 'Bad request');
    return next();
  }

  if (await userService.isExists(data.username)) {
    return res.status(200).json(
      new LMSResponse(null, {
        status: false,
        message: 'username have exists',
      })
    );
  }

  userService
    .createOne(data)
    .then(user => {
      if (user) {
        return res.status(200).json(new LMSResponse(null, { status: true }));
      }

      res.status(200).json(new LMSResponse(null, { status: false }));
    })
    .catch(err => {
      req.error = new LMSError(500, err);
      next();
    });
});

router.post('/sign-up-lab', async (req, res, next) => {
  const { user, lab } = req.body;

  if (
    !(
      isEnoughFields(user, REQUIRE_ADMIN_LAB_SIGN_UP_FIELDS) &&
      isEnoughFields(lab, REQUIRE_LAB_SIGN_UP_FIELDS)
    )
  ) {
    req.error = new LMSError(400, 'Bad request');
    return next();
  }

  if (await userService.isExists(user.username)) {
    return res.status(200).json(
      new LMSResponse(null, {
        status: false,
        message: 'username have exists',
      })
    );
  }

  userService
    .signUpLab(user, lab)
    .then(({ user, lab }) => {
      if (!user || !lab) {
        return res.status(200).json(new LMSResponse(null, { status: false }));
      }

      res.status(200).json(new LMSResponse(null, { status: true }));
    })
    .catch(err => {
      req.error = new LMSError(500, err);
      next();
    });
});

router.post('/check-exists-username', async (req, res, next) => {
  const flag = await userService.isExists(req.body.username);

  res.status(200).json(new LMSResponse(null, { exists: flag }));
});

export const userRouter = router;
