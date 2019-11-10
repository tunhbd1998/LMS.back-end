"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;

var JwtStrategy = require("passport-jwt").Strategy;

var ExtractJwt = require("passport-jwt").ExtractJwt;

var _require = require("lodash"),
    omit = _require.omit,
    get = _require.get;

var JWT = require("../config").PASSPORT.JWT; // const { userModel } = require("../database");


var _require2 = require("../defines/errors"),
    CustomError = _require2.CustomError;

var _require3 = require("../defines/constants"),
    NEED_TO_REMOVE_FIELDS_TOKEN = _require3.NEED_TO_REMOVE_FIELDS_TOKEN;

var _require4 = require("../utils/password"),
    hashPassword = _require4.hashPassword; // JWT Strategy


var useJwtStrategy = function useJwtStrategy() {
  var opts = {
    secretOrKey: JWT.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };
  passport.use(new JwtStrategy(opts, function (jwt_payload, cb) {
    if (!jwt_payload) {
      return cb(null, null);
    }

    userModel.findOne({
      username: jwt_payload.username
    }).then(function (user) {
      return cb(null, user);
    })["catch"](function (err) {
      return cb(err, null);
    });
  }));
}; // Local Strategy


var useLocalStrategy = function useLocalStrategy() {
  passport.use(new LocalStrategy(function (username, password, cb) {
    userModel.findOne({
      username: username,
      password: hashPassword(password)
    }).then(function (user) {
      if (!user) {
        return cb(null, null);
      }

      cb(null, omit(user, NEED_TO_REMOVE_FIELDS_TOKEN));
    })["catch"](function (err) {
      return cb(err, null);
    });
  }));
}; // Google Strategy


var useGoogleStrategy = function useGoogleStrategy() {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE.CLIENT_ID,
    clientSecret: GOOGLE.CLIENT_SECRET,
    callbackURL: GOOGLE.CALLBACK_URL,
    profileFields: ["email", "birthday", "gender"]
  }, function (accessToken, refreshToken, profile, cb) {
    userModel.findOne({
      google_id: profile.id
    }).then(function (user) {
      if (user) {
        return cb(null, omit(user, [].concat(_toConsumableArray(NEED_TO_REMOVE_FIELDS_TOKEN), ["facebook_id"])));
      }

      var newUserData = {
        username: profile.id,
        google_id: profile.id,
        display_name: profile.displayName,
        avatar: profile.photos[0] ? profile.photos[0].value : null,
        gender: profile.gender ? profile.gender === "male" ? 1 : profile.gender === "female" ? 0 : 2 : null,
        birthday: get(profile, ["json", "birthday"], null),
        email: get(profile, ["emails", 0, "value"], null)
      };
      userModel.addNew(newUserData).then(function (user) {
        return cb(null, omit(user, [].concat(_toConsumableArray(NEED_TO_REMOVE_FIELDS_TOKEN), ["facebook_id"])));
      })["catch"](function (err) {
        return cb(err, null);
      });
    })["catch"](function (err) {
      return cb(err, null);
    });
  }));
}; // Facebook Strategy


var useFacebookStrategy = function useFacebookStrategy() {
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK.CLIENT_ID,
    clientSecret: FACEBOOK.CLIENT_SECRET,
    callbackURL: FACEBOOK.CALLBACK_URL,
    profileFields: ["id", "displayName", "photos", "emails"]
  }, function _callee(accessToken, refreshToken, profile, cb) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userModel.findOne({
              facebook_id: profile.id
            }).then(function (user) {
              console.log("user", user);

              if (user) {
                return cb(null, omit(user, [].concat(_toConsumableArray(NEED_TO_REMOVE_FIELDS_TOKEN), ["google_id"])));
              }

              var newUserData = {
                username: profile.id,
                facebook_id: profile.id,
                display_name: profile.displayName,
                avatar: profile.photos[0] ? profile.photos[0].value : null,
                email: profile.emails[0] ? profile.emails[0].value : null
              };
              userModel.addNew(newUserData).then(function (user) {
                return cb(null, omit(user, [].concat(_toConsumableArray(NEED_TO_REMOVE_FIELDS_TOKEN), ["google_id"])));
              })["catch"](function (err) {
                return cb(err, null);
              });
            })["catch"](function (err) {
              console.log(err);
              cb(new CustomError(500, err), null);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }));
};

module.exports = {
  useLocalStrategy: useLocalStrategy,
  useJwtStrategy: useJwtStrategy,
  useFacebookStrategy: useFacebookStrategy,
  useGoogleStrategy: useGoogleStrategy
};