import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { omit, get } from 'lodash';
import { PASSPORT } from '../config';
import { userService } from '../services';
import { hashPassword, comparePassword } from '../utils/password';

const { JWT } = PASSPORT;

// JWT Strategy
export const useJwtStrategy = () => {
  const opts = {
    secretOrKey: JWT.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  passport.use(
    new JwtStrategy(opts, (jwtPayload, cb) => {
      if (!jwtPayload) {
        return cb(null, null);
      }

      userService
        .findOne({ username: jwtPayload.username })
        .then(user => cb(null, user))
        .catch(err => cb(err, null));
    })
  );
};

// Local Strategy
export const useLocalStrategy = () => {
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      console.log('password', password);
      userService
        .findOne({ username })
        .then(async user => {
          if (user && (await comparePassword(password, user.password))) {
            return cb(
              null,
              omit(user, [
                'password',
                'phone',
                'email',
                'university',
                'IDCardNumber',
                'IDNumber',
                'labId',
                'isTeacher'
              ])
            );
          }

          return cb(null, null);
        })
        .catch(err => cb(err, null));
    })
  );
};

// // Google Strategy
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
