import express from 'express';
import { isNumber, get } from 'lodash';
import { FETCH_DATA } from '../config';
import { LMSResponse } from '../defines/response';
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

export const labRouter = router;
