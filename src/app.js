import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { handleNotFound, handleError, userRouter } from './routes';
// import { configPassport } from './passport';

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
// configPassport(app);

app.use('/users', userRouter);
app.use(handleNotFound);
app.use(handleError);

export default app;
