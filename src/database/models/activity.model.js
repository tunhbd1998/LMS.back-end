import Sequelize from 'sequelize';
import { getLabModel } from './lab.model';
import { getUserModel } from './user.model';
import { getTakePartInActivityModel } from './take-part-in-activity.model';

export const getActivityModel = conn => {
  const ActivityModel = conn.define(
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

  const LabModel = getLabModel(conn);
  const UserModel = getUserModel(conn);
  const TakePartInActivityModel = getTakePartInActivityModel(conn);

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

  return ActivityModel;
};
