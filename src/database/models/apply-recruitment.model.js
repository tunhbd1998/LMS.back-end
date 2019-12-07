import Sequelize from 'sequelize';

export const getApplyRecruitmentModel = conn => {
  return conn.define(
    'apply_recruitment',
    {
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      }
    },
    { tableName: 'apply_recruitment', timestamps: false }
  );
};
