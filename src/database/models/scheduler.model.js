import Sequelize from 'sequelize';
import { UserModel } from './user.model';
import { connection } from '../connection';

const SchedulerModel = connection.define(
  'scheduler',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    beginTime: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    endTime: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    work: {
      type: Sequelize.TEXT,
      defaultValue: null
    },
    type: {
      type: Sequelize.TINYINT,
      defaultValue: 0
    }
  },
  { tableName: 'scheduler', timestamps: false }
);

SchedulerModel.belongsTo(UserModel, {
  as: 'ofUser',
  foreignKey: 'userId',
  targetKey: 'username',
  timestamps: false
});

export { SchedulerModel };
