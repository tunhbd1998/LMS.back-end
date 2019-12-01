import express from 'express';
import { labService } from '../services/lab.service';
import { LMSResponse } from '../defines/response';
import { LMSError } from '../defines/errors';

const router = express.Router();

export const labRouter = router;

router.get('/lab',(req,res,next) =>{
  const { page, pageSize } = req.query;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
 
  labService.findAllLab().then(lab => console.log(lab))
    .catch(err => console.log(err))
});

 router.get('/labs/:id', withAuth, (req, res, next) => {
    labService
      .getLabById(req.params)
      .then(lab => res.status(200).json(new LMSResponse(null, { lab })))
      .catch(err => {
        console.log(err);
        req.error = new LMSError(500, 'Server error');
        next();
      });
  });

export const labRouter = router;
