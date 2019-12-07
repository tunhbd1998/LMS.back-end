import Sequelize from 'sequelize';
import { getUserModel } from './user.model';

export const getSchedulerModel = conn => {
  const SchedulerModel = conn.define(
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
      // userId: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
    },
    { tableName: 'scheduler', timestamps: false }
  );

  const UserModel = getUserModel(conn);
  SchedulerModel.belongsTo(UserModel, {
    as: 'ofUser',
    foreignKey: 'userId',
    targetKey: 'username',
    timestamps: false
  });

  return SchedulerModel;
};
