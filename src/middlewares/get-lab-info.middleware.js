import { get } from 'lodash';
import { LMSResponse } from '../defines/response';
import { UnauthorizatedRequest } from '../defines/errors';
import { labService } from '../services/lab.service';

export const getLabInfo = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(200)
      .json(new LMSResponse(new UnauthorizatedRequest(), null));
  }

  const lab = await labService.findOne({
    where: {
      adminId: get(req, ['user', 'username'], null)
    },
    attributes: ['id']
  });
  req.lab = lab;
  next();
};
