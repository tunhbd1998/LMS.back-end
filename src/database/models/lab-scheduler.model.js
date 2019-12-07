import Sequelize from 'sequelize';

export const getLabSchedulerModel = conn => {
  return conn.define(
    'lab_scheduler',
    {},
    { tableName: 'lab_scheduler', timestamps: false }
  );
};
