import express from 'express';
import { isNumber, get } from 'lodash';
import { FETCH_DATA } from '../config';
import { LMSResponse } from '../defines/response';
import { withAuth } from '../middlewares/with-auth-middleware';
import { LMSError, InternalError } from '../defines/errors';
import { convertToInt } from '../utils/lang';
import { LabModel } from '../database/models/lab.model';
import { LabAddressModel } from '../database/models/lab-address.model';
import { labService } from '../services/lab.service';

const router = express.Router();

router.get('/filter/many', (req, res, next) => {
  const { name, university, specialize, province } = req.query;
  const page = convertToInt(req.query.page, 1);
  const pageSize = convertToInt(req.query.pageSize, FETCH_DATA.PAGE_SIZE.LAB);

  labService
    .filterLabs(name, university, specialize, province, page, pageSize)
    .then(({ page, totalPage, labs }) => {
      console.log(page, totalPage, labs);
      res.status(200).json(new LMSResponse(null, { page, totalPage, labs }));
    })
    .catch(err => {
      req.error = new InternalError(err);
      next();
    });
});

router.get('/highlights', async (req, res, next) => {
  const page = convertToInt(req.query.page, 1);
  const pageSize = convertToInt(req.query.pageSize, FETCH_DATA.PAGE_SIZE.LAB);
  
  labService
    .getHighlightLabs(page, pageSize)
    .then(({ page, totalPage, labs }) => {
      res.status(200).json(new LMSResponse(null, { page, totalPage, labs }));
    })
    .catch(err => {
      req.error = new InternalError(err);
      next();
    });
});
  
router.get('/:id', (req, res, next) => {
  const labId = get(req, ['params', 'id']);

  labService
    .getLabDetail(labId)
    .then(lab => res.status(200).json(new LMSResponse(null, { lab })))
    .catch(err => {
      req.error = new InternalError(err);
      next();
    });
});

router.post('/add-lab-member', async (req, res, next) => {
  const data = req.query;
  console.log(data);
  if (!isEnoughFields(data, REQUIRE_LAB_MEMBER_SIGN_UP_FIELDS, true)) {
    req.error = new LMSError(400, 'Bad request');
    return next();
  }


  labService
    .addLabMember(data)
    .then(labMember => {
      console.log(labMember);
      if (labMember) {
        return res.status(200).json(new LMSResponse(null, { status: true }));
      }

      res.status(200).json(new LMSResponse(null, { status: false }));
    })
    .catch(err => {
      req.error = new LMSError(500, err);
      next();
    });
});

router.get('/lab-member-list', async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || FETCH_DATA.PAGE_SIZE.LAB_MEMBER;
  const limit = pageSize;
  const offset = (page - 1) * limit;
  const totalCount = await labService.count().catch(err => {
    req.error = new LMSError(err.code, err.message);
  });

  if (isNumber(totalCount)) {
    const totalPage = Math.ceil((totalCount * 1.0) / pageSize);

    if (page > totalPage) {
      return res
        .status(200)
        .json(new LMSResponse(null, { page, totalPage, labMembers: [] }));
    }

    labService.getLabMemberList({ limit, offset }).then(labMembers => {
      res.status(200).json(new LMSResponse(null, { page, totalPage, labMembers }));
    });
  } else {
    next();
  }
});