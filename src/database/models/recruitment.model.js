import Sequelize from 'sequelize';
import { connection } from '../connection';
import { UserModel } from './user.model';
import { LabModel } from './lab.model';
import { ProjectModel } from './project.model';
import { ApplyRecruitmentModel } from './apply-recruitment.model';

const RecruitmentModel = connection.define(
  'recruitment',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    position: {
      type: Sequelize.TEXT,
      defaultValue: null
    },
    requirement: {
      type: Sequelize.TEXT,
      defaultValue: null
    },
    createdDate: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    isOpen: {
      type: Sequelize.TINYINT,
      defaultValue: 1
    }
  },
  { tableName: 'recruitment', timestamps: false }
);

RecruitmentModel.belongsTo(LabModel, {
  as: 'forLab',
  foreignKey: 'forLabId',
  targetKey: 'id',
  timestamps: false
});
RecruitmentModel.belongsTo(ProjectModel, {
  as: 'forProject',
  foreignKey: 'forProjectId',
  targetKey: 'id',
  timestamps: false
});
RecruitmentModel.belongsToMany(UserModel, {
  as: 'appliedUsers',
  through: ApplyRecruitmentModel,
  foreignKey: 'recruitmentId',
  otherKey: 'userId',
  timestamps: false
});

export { RecruitmentModel };
