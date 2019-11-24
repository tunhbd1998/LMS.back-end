import express from 'express';
import { labService } from '../services/lab.service';
import { LMSResponse } from '../defines/response';
import { LMSError } from '../defines/errors';

const router = express.Router();

router.get('/member-recruitment/:labId', (req, res, next) => {
  const { page, pageSize } = req.query;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  const { labId } = req.params;

  labService
    .findMemberRecruitments(labId, limit, offset)
    .then(recruitments =>
      res.status(200).json(new LMSResponse(null, { recruitments }))
    )
    .catch(err => {
      req.error = new LMSError(500, err);
      next();
    });
});

export const labRouter = router;
