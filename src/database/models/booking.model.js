import Sequelize from 'sequelize';
import { getLabModel } from './lab.model';
import { getUserModel } from './user.model';

export const getBookingModel = conn => {
  const BookingModel = conn.define(
    'booking',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      beginTime: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      endTime: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      purpose: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1
      },
      type: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      }
    },
    { tableName: 'booking', timestamps: false }
  );

  const LabModel = getLabModel(conn);
  const UserModel = getUserModel(conn);

  BookingModel.belongsTo(UserModel, {
    as: 'user',
    foreignKey: 'userId',
    targetKey: 'username',
    timestamps: false
  });
  BookingModel.belongsTo(LabModel, {
    as: 'lab',
    foreignKey: 'labId',
    targetKey: 'id',
    timestamps: false
  });

  return BookingModel;
};
