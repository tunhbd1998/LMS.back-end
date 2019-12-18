import Sequelize from 'sequelize';
import { connection } from '../connection';
import { UserModel } from './user.model';
import { LabModel } from './lab.model';

const BookingModel = connection.define(
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

export { BookingModel };
