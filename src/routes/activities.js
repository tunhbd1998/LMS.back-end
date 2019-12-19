import express from 'express';
import { get } from 'lodash';
import { activityService } from '../services/activity.service';
import { LMSResponse } from '../defines/response';
import { LMSError, InternalError } from '../defines/errors';
import { LabModel } from '../database/models/lab.model';

const router = express.Router();

router.get('/active', (req, res, next) => {
  activityService
    .getActiveActivities()
    .then(data => res.status(200).json(new LMSResponse(null, data)))
    .catch(err => {
      console.log('activitiesRoute:error ', err);
      req.error = new InternalError('Lỗi');
      next();
    });
});

router.get('/:id', (req, res, next) => {
  const id = get(req, ['params', 'id'], null);

  if (!id) {
    return res.status(200).json(new LMSResponse(null, { activity: null }));
  }

  activityService
    .findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'address',
        'image',
        'imageId',
        'startTime',
        'endTime',
        'detail'
      ],
      include: [
        {
          model: LabModel,
          as: 'lab',
          required: true,
          attributes: ['id', 'name', 'university', 'specialize']
        }
      ]
    })
    .then(activity => res.status(200).json(new LMSResponse(null, { activity })))
    .catch(err => {
      console.log('get detail activity error: ', err);
      req.error = new LMSError(500, 'Server error');
      next();
    });
});

export const activityRouter = router;
