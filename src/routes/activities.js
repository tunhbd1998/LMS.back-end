import express from 'express';
import { activityService } from '../services/activity.service';
import { LMSResponse } from '../defines/response';
import { LMSError } from '../defines/errors';
import { withAuth } from '../middlewares/with-auth-middleware';

const router = express.Router();


router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

 router.get('/:id', (req, res, next) => {
  activityService
      .getActivityById(req.params)
      .then(activity => res.status(200).json(new LMSResponse(null, { activity })))
      .catch(err => {
        console.log(err);
        req.error = new LMSError(500, 'Server error');
        next();
      });
  });

  export const activityRouter = router;
