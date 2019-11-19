import Sequelize from 'sequelize';
// import { getUserModel } from './user.model';
// import { getRecruitmentModel } from './recruitment.model';

export const getApplyRecruitmentModel = conn => {
  return conn.define(
    'apply_recruitment',
    {
      // userId: {
      //   type: Sequelize.STRING,
      //   primaryKey: true,
      //   references: {
      //     model: getUserModel(conn),
      //     key: 'username',
      //   },
      // },
      // recruitmentId: {
      //   type: Sequelize.UUID,
      //   primaryKey: true,
      //   references: {
      //     model: getRecruitmentModel(conn),
      //     key: 'id',
      //   },
      // },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
    },
    { tableName: 'apply_recruitment', timestamps: false }
  );
};
