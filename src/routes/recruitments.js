import { Router } from 'express';
import { recruitmentService } from '../services';
import { LMSResponse } from '../defines/response';
import { LMSError } from '../defines/errors';
import { FETCH_DATA } from '../config';
import { RecruitmentModel } from '../database/models/recruitment.model';

const router = Router();

router.get('/lab-member/opening', async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || FETCH_DATA.PAGE_SIZE.RECRUITMENT;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  const totalCount = await recruitmentService.countLabMemberRecruitments(
    null,
    1
  );
  const totalPage = Math.ceil((totalCount * 1.0) / pageSize);

  if (totalPage < page) {
    return res
      .status(200)
      .json(new LMSResponse(null, { totalPage, page, recruitments: [] }));
  }

  recruitmentService
    .findLabMemberRecruitments(null, 1, limit, offset)
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

router.get('/project-member/opening', async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || FETCH_DATA.PAGE_SIZE.RECRUITMENT;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  const totalCount = await recruitmentService.countProjectMemberRectruitments(
    null,
    null,
    1
  );
  const totalPage = Math.ceil((totalCount * 1.0) / pageSize);

  if (totalCount < page) {
    return res
      .status(200)
      .json(new LMSResponse(null, { page, totalPage, recruitments: [] }));
  }

  recruitmentService
    .findProjectMemberRecruitments(null, null, 1, limit, offset)
    .then(recruitments =>
      res
        .status(200)
        .json(new LMSResponse(null, { totalCount, page, recruitments }))
    )
    .catch(err =>
      res.status(200).json(new LMSResponse(new LMSError(500, 'error'), null))
    );
});

export const recruitmentRouter = router;
