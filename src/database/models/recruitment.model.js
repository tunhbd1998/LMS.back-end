import Sequelize from 'sequelize';
import { getLabModel } from './lab.model';
import { getProjectModel } from './project.model';
import { getApplyRecruitmentModel } from './apply-recruitment.model';
import { getUserModel } from './user.model';

export const getRecruitmentModel = conn => {
  const RecruitmentModel = conn.define(
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
      // forProject: {
      //   type: Sequelize.UUID,
      //   defaultValue: null,
      //   references: {
      //     model: ProjectModel,
      //     key: 'id',
      //   },
      // },
      // forLab: {
      //   type: Sequelize.UUID,
      //   defaultValue: null,
      //   references: {
      //     model: getLabModel(conn),
      //     key: 'id',
      //   },
      // },
      isOpen: {
        type: Sequelize.TINYINT,
        defaultValue: 1
      }
    },
    { tableName: 'recruitment', timestamps: false }
  );

  const LabModel = getLabModel(conn);
  const ProjectModel = getProjectModel(conn);
  const ApplyRecruitmentModel = getApplyRecruitmentModel(conn);
  const UserModel = getUserModel(conn);

  RecruitmentModel.belongsTo(LabModel, {
    foreignKey: 'forLab',
    targetKey: 'id',
    timestamps: false
  });
  RecruitmentModel.belongsTo(ProjectModel, {
    foreignKey: 'forProject',
    targetKey: 'id',
    timestamps: false
  });
  RecruitmentModel.belongsToMany(UserModel, {
    through: ApplyRecruitmentModel,
    foreignKey: 'recruitmentId',
    otherKey: 'userId',
    timestamps: false
  });

  return RecruitmentModel;
};
