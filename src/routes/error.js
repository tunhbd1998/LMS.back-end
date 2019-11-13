import { LMSResponse } from '../defines/response';

export const handleError = (req, res) => {
  res.status(200).json(new LMSResponse(req.error, null));
};
