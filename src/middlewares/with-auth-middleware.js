import passport from 'passport';
import { LMSResponse } from '../defines/response';
import { LMSError, UnauthorizatedRequest } from '../defines/errors';

export const withAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res
        .status(200)
        .json(new LMSResponse(new UnauthorizatedRequest(), null));
    }

    req.user = user;
    next();
  })(req, res, next);
};
