"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _debug = _interopRequireDefault(require("debug"));

var _routes = require("./routes");

var _services = require("./services");

var _passport = require("./passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('LMS:app');

_dotenv.default.config({
  path: _path.default.join(__dirname, '/.env')
});

const app = (0, _express.default)(); // config app

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, 'public'))); // view engine setup

app.set('views', _path.default.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // config passport

(0, _passport.configPassport)(app);
app.use('/users', _routes.userRouter);
app.use(_routes.handleNotFound);
app.use(_routes.handleError); // userService
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

var _default = app;
exports.default = _default;