import express from 'express';
import { labService } from '../services/lab.service';
import { LMSResponse } from '../defines/response';
import { LMSError } from '../defines/errors';
import { FETCH_DATA } from '../config';

const router = express.Router();

router.get('/member-recruitments/opening', async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || FETCH_DATA.PAGE_SIZE.RECRUITMENT;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  const totalCount = await labService.countMemberRecruitments(null, 1);
  const totalPage = Math.ceil((totalCount * 1.0) / pageSize);

  if (totalPage < page) {
    return res
      .status(200)
      .json(new LMSResponse(null, { totalPage, page, recruitments: [] }));
  }

  labService
    .findMemberRecruitments(null, 1, limit, offset)
    .then(recruitments =>
      res
        .status(200)
        .json(new LMSResponse(null, { totalPage, page, recruitments }))
    )
    .catch(err => {
      req.error = new LMSError(500, err);
      next();
    });
});

export const labRouter = router;
