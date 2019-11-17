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

var _services = require("../services");

var _password = require("../utils/password");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  JWT
} = _config.PASSPORT; // JWT Strategy

const useJwtStrategy = () => {
  const opts = {
    secretOrKey: JWT.SECRET,
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  _passport.default.use(new _passportJwt.Strategy(opts, (jwtPayload, cb) => {
    if (!jwtPayload) {
      return cb(null, null);
    }

    _services.userService.findOne({
      username: jwtPayload.username
    }).then(user => cb(null, user)).catch(err => cb(err, null));
  }));
}; // Local Strategy


exports.useJwtStrategy = useJwtStrategy;

const useLocalStrategy = () => {
  _passport.default.use(new _passportLocal.Strategy(async (username, password, cb) => {
    console.log('password', password);

    _services.userService.findOne({
      username
    }).then(async user => {
      if (user && (await (0, _password.comparePassword)(password, user.password))) {
        return cb(null, (0, _lodash.omit)(user, ['password', 'phone', 'email', 'university', 'IDCardNumber', 'IDNumber', 'labId', 'isTeacher']));
      }

      return cb(null, null);
    }).catch(err => cb(err, null));
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