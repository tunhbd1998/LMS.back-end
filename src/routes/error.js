import { LMSResponse } from '../defines/response';

export const handleError = (req, res) => {
  console.log('error', req.error);
  res.status(200).json(new LMSResponse(req.error, null));
};
