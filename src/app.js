import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import debugModule from 'debug';
import { handleNotFound, handleError, userRouter } from './routes';
import { userService } from './services';
import { configPassport } from './passport';

const log = debugModule('LMS:app');
dotenv.config({ path: path.join(__dirname, '/.env') });

const app = express();
// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// config passport
configPassport(app);

app.use('/users', userRouter);
app.use(handleNotFound);
app.use(handleError);

// userService
//   .createOne({
//     username: 'tunh',
//     password: 'tunh',
//     fullname: 'Nguyen huu tu',
//     phone: '0909090909',
//     email: 'tunhbd1998@gmail.com',
//     IDCardNumber: '333333333',
//     university: 'university of science'
//   })
//   .then(user => {
//     log('created user', user);
//   })
//   .catch(err => {
//     log('create error', err);
//   });

// userService
//   .findOne({ username: 'tunh' })
//   .then(user => log('user', user))
//   .catch(err => log('error', err));

export default app;
