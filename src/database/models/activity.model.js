import Sequelize from 'sequelize';
import { connection } from '../connection';
import { LabModel } from './lab.model';
import { UserModel } from './user.model';
import { TakePartInActivityModel } from './take-part-in-activity.model';

const ActivityModel = connection.define(
  'activity',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    address: {
      type: Sequelize.TEXT,
      defaultValue: null
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    imageId: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    startTime: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    endTime: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    detail: {
      type: Sequelize.TEXT,
      defaultValue: null
    }
  },
  { tableName: 'activity', timestamps: false }
);

ActivityModel.belongsTo(LabModel, {
  as: 'lab',
  foreignKey: 'labId',
  targetKey: 'id',
  timestamps: false
});
ActivityModel.belongsToMany(UserModel, {
  as: 'takePartInUsers',
  through: TakePartInActivityModel,
  foreignKey: 'activityId',
  otherKey: 'userId',
  timestamps: false
});

export { ActivityModel };
