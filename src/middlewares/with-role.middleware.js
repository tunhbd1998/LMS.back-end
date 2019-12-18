import { get } from 'http';
import { LMSResponse } from '../defines/response';
import { UnauthorizatedRequest } from '../defines/errors';

export const withRole = role => (req, res, next) => {
  if (!req.user || get(req, ['user', 'role']) !== role) {
    return res
      .status(200)
      .json(new LMSResponse(new UnauthorizatedRequest(), null));
  }

  next();
};
