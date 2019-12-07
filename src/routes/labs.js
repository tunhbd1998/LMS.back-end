import express from 'express';
import { isNumber, get } from 'lodash';
import { withAuth } from '../middlewares/with-auth-middleware';
import { FETCH_DATA } from '../config';
import { labService } from '../services/lab.service';
import { LMSResponse } from '../defines/response';
import { LMSError } from '../defines/errors';
import { convertToInt } from '../utils/lang';
import { getLabAddressModel } from '../database/models/lab-address.model';

const router = express.Router();

router.get('/search', (req, res, next) => {
  const { name, university, specialize, province } = req.query;
  const page = convertToInt(req.query.page, 1);
  const pageSize = convertToInt(req.query.pageSize, FETCH_DATA.PAGE_SIZE.LAB);
  const limit = pageSize;
  const offset = (page - 1) * limit;

  labService
    .count({
      where: {
        name,
        university,
        specialize
      },
      include: [
        {
          model: getLabAddressModel,
          as: 'address',
          required: false,
          where: { province }
        }
      ]
    })
    .then(totalCount => {
      const totalPage = Math.ceil((totalCount * 1.0) / pageSize);

      if (page > totalPage) {
        return res
          .status(200)
          .json(new LMSResponse(null, { labs: [], page, totalPage }));
      }

      labService
        .findMany({
          where: { name, university, specialize },
          fields: ['id', 'name', 'university', 'specialize'],
          include: [
            {
              model: getLabAddressModel,
              as: 'address',
              required: false,
              where: {
                province
              }
            }
          ],
          limit,
          offset
        })
        .then(labs => {
          res
            .status(200)
            .json(new LMSResponse(null, { labs, page, totalPage }));
        });
    })
    .catch(err => {
      req.error = new LMSError(500, err);
      next();
    });

  // labService
  //   .countLabs(name, university, specialize, province)
  //   .then(totalCount => {
  //     const totalPage = Math.ceil((totalCount * 1.0) / pageSize);

  //     if (page > totalPage) {
  //       return res
  //         .status(200)
  //         .json(new LMSResponse(null, { labs: [], page, totalPage }));
  //     }

  //     labService
  //       .findLabs(name, university, specialize, province, limit, offset)
  //       .then(labs => {
  //         res
  //           .status(200)
  //           .json(new LMSResponse(null, { labs, page, totalPage }));
  //       });
  //   })
  //   .catch(err => {
  //     req.error = new LMSError(500, err);
  //     next();
  //   });
});

router.get('/highlights', async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || FETCH_DATA.PAGE_SIZE.LAB;
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
        .json(new LMSResponse(null, { page, totalPage, labs: [] }));
    }

    labService.findMany({ limit, offset }).then(labs => {
      res.status(200).json(new LMSResponse(null, { page, totalPage, labs }));
    });
  } else {
    next();
  }
});

router.get('/:id', (req, res, next) => {
  const labId = get(req, ['params', 'id']);

  labService
    .getLabById(labId)
    .then(lab => res.status(200).json(new LMSResponse(null, { lab })))
    .catch(err => {
      console.log(err);
      req.error = new LMSError(500, 'Server error');
      next();
    });
});

export const labRouter = router;
