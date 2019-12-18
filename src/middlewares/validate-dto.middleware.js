import { get } from 'lodash';
import { isEnoughFields } from '../utils/fields';
import { LMSResponse } from '../defines/response';
import { LMSError, BadRequest } from '../defines/errors';

export const validateDTO = (fieldsToCheck, fullChecking = false) => (
  req,
  res,
  next
) => {
  const dataToCheck = get(req, req.method === 'POST' ? 'body' : 'query');

  if (isEnoughFields(dataToCheck, fieldsToCheck, fullChecking)) {
    return next();
  }

  return res.status(200).json(new LMSResponse(new BadRequest(), null));
};
