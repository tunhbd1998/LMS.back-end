import passport from 'passport';
import { LMSResponse } from '../defines/response';
import { LMSError } from '../defines/errors';

export const withAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res
        .status(200)
        .json(new LMSResponse(new LMSError(401, 'Unauthorization'), null));
    }

    req.user = user;
    next();
  })(req, res, next);
};
