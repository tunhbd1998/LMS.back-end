import Sequelize, { SequelizeScopeError } from 'sequelize';
import { getLabModel } from './lab.model';
import { getUserModel } from './user.model';
import { getSchedulerModel } from './scheduler.model';
import { getProjectMemberModel } from './project-member.model';
import { getProjectSchedulerModel } from './project-scheduler.model';

export const getProjectModel = conn => {
  const ProjectModel = conn.define(
    'project',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
      // labId: {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      //   references: {
      //     model: getLabModel(conn),
      //     key: 'id',
      //   },
      // },
      // projectAdmin: {
      //   type: Sequelize.STRING,
      //   defaultValue: null,
      //   references: {
      //     model: getUserModel(conn),
      //     key: 'username',
      //   },
      // },
    },
    { tableName: 'project', timestamps: false }
  );

  const UserModel = getUserModel(conn);
  const LabModel = getLabModel(conn);
  const SchedulerModel = getSchedulerModel(conn);
  const ProjectMemberModel = getProjectMemberModel(conn);
  const ProjectSchedulerModel = getProjectSchedulerModel(conn);

  ProjectModel.belongsTo(UserModel, {
    foreignKey: 'projectAdmin',
    targetKey: 'username',
    timestamps: false,
  });
  ProjectModel.belongsTo(LabModel, {
    foreignKey: 'labId',
    targetKey: 'id',
    timestamps: false,
  });
  ProjectModel.belongsToMany(UserModel, {
    through: ProjectMemberModel,
    foreignKey: 'projectId',
    otherKey: 'userId',
    timestamps: false,
  });
  ProjectModel.belongsToMany(SchedulerModel, {
    through: ProjectSchedulerModel,
    foreignKey: 'projectId',
    otherKey: 'schedulerId',
    timestamps: false,
  });

  return ProjectModel;
};
