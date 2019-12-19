import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { LMSError, InternalError, BadRequest } from '../defines/errors';
import { LMSResponse } from '../defines/response';
import {
  REQUIRE_MEMBER_SIGN_UP_FIELDS,
  REQUIRE_ADMIN_LAB_SIGN_UP_FIELDS,
  REQUIRE_LAB_SIGN_UP_FIELDS,
  REQUIRE_USER_UPDATE_PROFILE_FIELDS
} from '../defines/constants';
import { PASSPORT, USER_ROLES } from '../config';
import { userService } from '../services';
import { isEnoughFields } from '../utils/fields';
import { withAuth } from '../middlewares/with-auth-middleware';
import { uploadImageFile } from '../multer';
import { uploadImage } from '../utils/uploadFile';
import { labService } from '../services/lab.service';
import { validateDTO } from '../middlewares/validate-dto.middleware';

const router = express.Router();
const { JWT } = PASSPORT;

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/sign-in', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      req.error = new InternalError(err);
      return next();
    }

    if (!user) {
      return res.status(200).json(
        new LMSResponse(null, {
          token: null,
          message: 'Tên đăng nhập hoặc mật khẩu không đúng',
          role: null
        })
      );
    }

    if (!user.isAccepted) {
      return res.status(200).json(
        new LMSResponse(null, {
          token: null,
          role: null,
          message: 'Tài khoản của bạn chưa được duyệt bởi hệ thống.'
        })
      );
    }

    req.logIn(user, { session: false }, err => {
      if (err) {
        req.error = new InternalError(err);
        return next();
      }

      return res.status(200).json(
        new LMSResponse(null, {
          token: jwt.sign(user, JWT.SECRET),
          role: USER_ROLES[user.role],
          message: 'Đăng nhập thành công'
        })
      );
    });
  })(req, res, next);
});

router.post(
  '/sign-up-member',
  validateDTO(REQUIRE_MEMBER_SIGN_UP_FIELDS, true),
  async (req, res, next) => {
    const data = req.body;

    if (await userService.isExists({ username: data.username }, 'username')) {
      return res.status(200).json(
        new LMSResponse(null, {
          status: false,
          message: 'Tên đăng nhập đã tồn tại. Hãy chọn tên đăng nhập khác'
        })
      );
    }

    userService
      .addUser(data)
      .then(user => {
        if (user) {
          return res.status(200).json(
            new LMSResponse(null, {
              status: true
            })
          );
        }

        res.status(200).json(new LMSResponse(null, { status: false }));
      })
      .catch(err => {
        req.error = new InternalError(err);
        next();
      });
  }
);

router.post('/sign-up-lab', async (req, res, next) => {
  const { user, lab } = req.body;

  if (
    !(
      isEnoughFields(user, REQUIRE_ADMIN_LAB_SIGN_UP_FIELDS, true) &&
      isEnoughFields(lab, REQUIRE_LAB_SIGN_UP_FIELDS, true)
    )
  ) {
    req.error = new BadRequest();
    return next();
  }

  if (await userService.isExists({ username: user.username }, 'username')) {
    return res.status(200).json(
      new LMSResponse(null, {
        status: false,
        message: 'Tên đăng nhập đã tồn tại. Hãy chọn tên đăng nhập khác'
      })
    );
  }

  labService
    .signUpNewLab(user, lab)
    .then(lab => {
      if (!lab) {
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
  const flag = await userService.isExists({ username: req.body.username });

  res.status(200).json(new LMSResponse(null, { exists: flag }));
});

router.get('/profile', withAuth, (req, res, next) => {
  userService
    .getProfile(req.user.username)
    .then(profile => res.status(200).json(new LMSResponse(null, { profile })))
    .catch(err => {
      req.error = new LMSError(500, 'Server error');
      next();
    });
});

router.post('/profile', withAuth, (req, res, next) => {
  const data = req.body;

  if (isEnoughFields(data, REQUIRE_USER_UPDATE_PROFILE_FIELDS)) {
    userService
      .updateProfile(req.user.username, data)
      .then(user => {
        res.status(200).json(new LMSResponse(null, { profile: user }));
      })
      .catch(err => {
        req.error = new InternalError('error');
        next();
      });
  } else {
    req.error = new BadRequest();
    next();
  }
});

router.post('/upload-avatar', withAuth, uploadImageFile, (req, res) => {
  uploadImage(req, res);
});

export const userRouter = router;
