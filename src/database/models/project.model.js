import Sequelize, { SequelizeScopeError } from 'sequelize';
import { UserModel } from './user.model';
import { SchedulerModel } from './scheduler.model';
import { ProjectSchedulerModel } from './project-scheduler.model';
import { ProjectMemberModel } from './project-member.model';
import { LabModel } from './lab.model';
import { connection } from '../connection';

const ProjectModel = connection.define(
  'project',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: null
    },
    status: {
      type: Sequelize.TINYINT,
      defaultValue: 0
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    imageId: {
      type: Sequelize.STRING,
      defaultValue: null
    }
  },
  { tableName: 'project', timestamps: false }
);

ProjectModel.belongsTo(UserModel, {
  as: 'projectAdmin',
  foreignKey: 'projectAdminId',
  targetKey: 'username',
  timestamps: false
});
ProjectModel.belongsTo(LabModel, {
  as: 'lab',
  foreignKey: 'labId',
  targetKey: 'id',
  timestamps: false
});
ProjectModel.belongsToMany(UserModel, {
  through: ProjectMemberModel,
  foreignKey: 'projectId',
  otherKey: 'userId',
  timestamps: false
});
ProjectModel.belongsToMany(SchedulerModel, {
  through: ProjectSchedulerModel,
  foreignKey: 'projectId',
  otherKey: 'schedulerId',
  timestamps: false
});

export { ProjectModel };
