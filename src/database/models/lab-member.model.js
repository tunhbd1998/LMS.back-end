import Sequelize from 'sequelize';
// import { getLabModel } from './lab.model';
// import { getUserModel } from './user.model';

export const getLabMemberModel = conn => {
  return conn.define(
    'lab_member',
    {
      // labId: {
      //   type: Sequelize.UUID,
      //   primaryKey: true,
      //   references: {
      //     model: getLabModel(conn),
      //     key: 'id',
      //   },
      // },
      // userId: {
      //   type: Sequelize.STRING,
      //   primaryKey: true,
      //   references: {
      //     model: getUserModel(conn),
      //     key: 'username',
      //   },
      // },
      position: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
    },
    { tableName: 'lab_member', timestamps: false }
  );
};
