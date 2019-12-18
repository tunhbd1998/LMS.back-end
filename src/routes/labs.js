import express from 'express';
import { isNumber, get } from 'lodash';
import { FETCH_DATA, USER_ROLE_ID } from '../config';
import { LMSResponse } from '../defines/response';
import { REQUIRE_LAB_MEMBER_SIGN_UP_FIELDS } from '../defines/constants';
import { LMSError, InternalError } from '../defines/errors';
import { convertToInt } from '../utils/lang';
import { labService } from '../services/lab.service';
import { validateDTO } from '../middlewares/validate-dto.middleware';
import { withAuth } from '../middlewares/with-auth-middleware';
import { withRole } from '../middlewares/with-role.middleware';
import { getLabInfo } from '../middlewares/get-lab-info.middleware';
import { labMemberService } from '../services/lab-member.service';

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

router.post(
  '/add-lab-member',
  withAuth,
  withRole(USER_ROLE_ID.LAB_ADMIN),
  validateDTO(REQUIRE_LAB_MEMBER_SIGN_UP_FIELDS, true),
  getLabInfo,
  (req, res, next) => {
    labService
      .addLabMember(get(req, ['lab', 'id']), get(req, 'body'))
      .then(labMember => {
        if (labMember) {
          return res
            .status(200)
            .json(new LMSResponse(null, { status: true, labMember }));
        }

        res
          .status(200)
          .json(new LMSResponse(null, { status: false, labMember: null }));
      })
      .catch(err => {
        req.error = new LMSError(500, err);
        next();
      });
  }
);

router.get(
  '/lab-member-list',
  withAuth,
  withRole(USER_ROLE_ID.LAB_ADMIN),
  getLabInfo,
  async (req, res, next) => {
    const page = get(req, ['query', 'page'], 1);
    const pageSize = get(
      req,
      ['query', 'pageSize'],
      FETCH_DATA.PAGE_SIZE.LAB_MEMBER
    );

    labService
      .getLabMemberList(req.lab.id, page, pageSize)
      .then(data => res.status(200).json(new LMSResponse(null, data)))
      .catch(err => {
        console.log('get lab member list error: ', err);
        req.error = new InternalError('Server error');
        next();
      });
  }
);

export const labRouter = router;
