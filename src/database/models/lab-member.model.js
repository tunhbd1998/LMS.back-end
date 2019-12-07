import Sequelize from 'sequelize';
// import { getLabModel } from './lab.model';
// import { getUserModel } from './user.model';

export const getLabMemberModel = conn => {
  return conn.define(
    'lab_member',
    {
      position: {
        type: Sequelize.TEXT,
        defaultValue: null
      }
    },
    { tableName: 'lab_member', timestamps: false }
  );
};
