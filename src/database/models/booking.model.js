import Sequelize from 'sequelize';
import { getLabModel } from './lab.model';
import { getUserModel } from './user.model';

export const getBookingModel = conn => {
  const BookingModel = conn.define(
    'booking',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      beginTime: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      endTime: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      purpose: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
      },
      type: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
      // labId: {
      //   type: Sequelize.UUID,
      //   defaultValue: null,
      //   references: {
      //     model: getLabModel(conn),
      //     key: 'id',
      //   },
      // },
      // userId: {
      //   type: Sequelize.STRING,
      //   defaultValue: null,
      //   references: {
      //     model: getUserModel(conn),
      //     key: 'username',
      //   },
      // },
    },
    { tableName: 'booking', timestamps: false }
  );

  const LabModel = getLabModel(conn);
  const UserModel = getUserModel(conn);
  BookingModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    targetKey: 'username',
    // constraints: false,
    timestamps: false,
  });
  BookingModel.belongsTo(LabModel, {
    foreignKey: 'labId',
    targetKey: 'id',
    // constraints: false,
    timestamps: false,
  });

  return BookingModel;
};
