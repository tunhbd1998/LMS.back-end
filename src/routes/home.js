import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('hello world');
});

export const homeRouter = router;
