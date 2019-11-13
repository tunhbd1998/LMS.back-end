"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _routes = require("./routes");

var _services = require("./services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config({
  path: _path["default"].join(__dirname, '/.env')
}); // import { configPassport } from './passport';


var app = (0, _express["default"])(); // config app

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public'))); // view engine setup

app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'ejs'); // config passport
// configPassport(app);

app.use('/users', _routes.userRouter);
app.use(_routes.handleNotFound);
app.use(_routes.handleError);

_services.userService.findMany({}).then(function (users) {
  return console.log('users', users);
})["catch"](function (err) {
  return console.log('error', err);
});

var _default = app;
exports["default"] = _default;