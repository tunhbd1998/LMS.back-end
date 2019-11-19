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
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      startTime: {
        type: Sequelize.TIME,
        defaultValue: null,
      },
      endTime: {
        type: Sequelize.TIME,
        defaultValue: null,
      },
      detail: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      // LabId: {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      //   references: {
      //     model: getLabModel(conn),
      //     key: 'id',
      //   },
      // },
    },
    { tableName: 'activity', timestamps: false }
  );

  const LabModel = getLabModel(conn);
  const UserModel = getUserModel(conn);
  const TakePartInActivityModel = getTakePartInActivityModel(conn);

  ActivityModel.belongsTo(LabModel, {
    foreignKey: 'labId',
    targetKey: 'id',
    // constraints: false,
    timestamps: false,
  });
  ActivityModel.belongsToMany(UserModel, {
    through: TakePartInActivityModel,
    foreignKey: 'activityId',
    otherKey: 'userId',
    timestamps: false,
  });

  return ActivityModel;
};
