import Sequelize from 'sequelize';
import { DATABASE } from '../config';

export const createConnection = () => {
  return new Sequelize(DATABASE.DB_NAME, DATABASE.USER, DATABASE.PASS, {
    host: DATABASE.HOST,
    dialect: DATABASE.TYPE
  });
};
