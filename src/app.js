import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import debugModule from 'debug';
import cors from 'cors';
import { handleNotFound, handleError, userRouter, homeRouter } from './routes';
import { configPassport } from './passport';
import { recruitmentRouter } from './routes/recruitments';

const log = debugModule('LMS:app');
dotenv.config({ path: path.join(__dirname, '/.env') });

const app = express();

// config app
app.use(cors());
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

app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/recruitments', recruitmentRouter);
app.use(handleNotFound);
app.use(handleError);

export default app;
