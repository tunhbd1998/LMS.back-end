import passport from 'passport';

import { useLocalStrategy, useJwtStrategy } from './strategies';

export const configPassport = app => {
  app.use(passport.initialize());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  useLocalStrategy();
  useJwtStrategy();
};
