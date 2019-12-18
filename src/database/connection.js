import Sequelize from 'sequelize';
import { DATABASE, TEST_DATABASE } from '../config';

export const createConnection = () => {
  const dbName = process.env.TEST_SYNC_DB
    ? TEST_DATABASE.DB_NAME
    : DATABASE.DB_NAME;
  const dbUser = process.env.TEST_SYNC_DB ? TEST_DATABASE.USER : DATABASE.USER;
  const dbPass = process.env.TEST_SYNC_DB ? TEST_DATABASE.PASS : DATABASE.PASS;
  const dbHost = process.env.TEST_SYNC_DB ? TEST_DATABASE.HOST : DATABASE.HOST;

  return new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: DATABASE.TYPE
  });
};

export const connection = createConnection();
