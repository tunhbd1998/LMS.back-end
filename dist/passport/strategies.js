"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocalStrategy = exports.useJwtStrategy = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _passportJwt = require("passport-jwt");

var _lodash = require("lodash");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JWT = _config.PASSPORT.JWT; // const { userModel } = require("../database");
// const { CustomError } = require('../defines/errors');
// const { NEED_TO_REMOVE_FIELDS_TOKEN } = require('../defines/constants');
// const { hashPassword } = require('../utils/password');
// JWT Strategy

var useJwtStrategy = function useJwtStrategy() {
  var opts = {
    secretOrKey: JWT.SECRET,
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  _passport["default"].use(new _passportJwt.Strategy(opts, function (jwtPayload, cb) {
    if (!jwtPayload) {
      return cb(null, null);
    } // userModel
    //   .findOne({ username: jwt_payload.username })
    //   .then(user => cb(null, user))
    //   .catch(err => cb(err, null));

  }));
}; // Local Strategy


exports.useJwtStrategy = useJwtStrategy;

var useLocalStrategy = function useLocalStrategy() {
  _passport["default"].use(new _passportLocal.Strategy(function (username, password, cb) {
    userModel.findOne({
      username: username,
      password: hashPassword(password)
    }).then(function (user) {
      if (!user) {
        return cb(null, null);
      }

      cb(null, (0, _lodash.omit)(user, NEED_TO_REMOVE_FIELDS_TOKEN));
    })["catch"](function (err) {
      return cb(err, null);
    });
  }));
}; // // Google Strategy
// const useGoogleStrategy = () => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: GOOGLE.CLIENT_ID,
//         clientSecret: GOOGLE.CLIENT_SECRET,
//         callbackURL: GOOGLE.CALLBACK_URL,
//         profileFields: ['email', 'birthday', 'gender'],
//       },
//       function(accessToken, refreshToken, profile, cb) {
//         userModel
//           .findOne({ google_id: profile.id })
//           .then(user => {
//             if (user) {
//               return cb(
//                 null,
//                 omit(user, [...NEED_TO_REMOVE_FIELDS_TOKEN, 'facebook_id'])
//               );
//             }
//             const newUserData = {
//               username: profile.id,
//               google_id: profile.id,
//               display_name: profile.displayName,
//               avatar: profile.photos[0] ? profile.photos[0].value : null,
//               gender: profile.gender
//                 ? profile.gender === 'male'
//                   ? 1
//                   : profile.gender === 'female'
//                   ? 0
//                   : 2
//                 : null,
//               birthday: get(profile, ['json', 'birthday'], null),
//               email: get(profile, ['emails', 0, 'value'], null),
//             };
//             userModel
//               .addNew(newUserData)
//               .then(user =>
//                 cb(
//                   null,
//                   omit(user, [...NEED_TO_REMOVE_FIELDS_TOKEN, 'facebook_id'])
//                 )
//               )
//               .catch(err => cb(err, null));
//           })
//           .catch(err => cb(err, null));
//       }
//     )
//   );
// };
// // Facebook Strategy
// const useFacebookStrategy = () => {
//   passport.use(
//     new FacebookStrategy(
//       {
//         clientID: FACEBOOK.CLIENT_ID,
//         clientSecret: FACEBOOK.CLIENT_SECRET,
//         callbackURL: FACEBOOK.CALLBACK_URL,
//         profileFields: ['id', 'displayName', 'photos', 'emails'],
//       },
//       async function(accessToken, refreshToken, profile, cb) {
//         userModel
//           .findOne({
//             facebook_id: profile.id,
//           })
//           .then(user => {
//             console.log('user', user);
//             if (user) {
//               return cb(
//                 null,
//                 omit(user, [...NEED_TO_REMOVE_FIELDS_TOKEN, 'google_id'])
//               );
//             }
//             const newUserData = {
//               username: profile.id,
//               facebook_id: profile.id,
//               display_name: profile.displayName,
//               avatar: profile.photos[0] ? profile.photos[0].value : null,
//               email: profile.emails[0] ? profile.emails[0].value : null,
//             };
//             userModel
//               .addNew(newUserData)
//               .then(user =>
//                 cb(
//                   null,
//                   omit(user, [...NEED_TO_REMOVE_FIELDS_TOKEN, 'google_id'])
//                 )
//               )
//               .catch(err => cb(err, null));
//           })
//           .catch(err => {
//             console.log(err);
//             cb(new CustomError(500, err), null);
//           });
//       }
//     )
//   );
// };


exports.useLocalStrategy = useLocalStrategy;