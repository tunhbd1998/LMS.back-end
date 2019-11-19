import Sequelize from 'sequelize';
// import { getSchedulerModel } from './scheduler.model';
// import { getLabModel } from './lab.model';

export const getLabSchedulerModel = conn => {
  return conn.define(
    'lab_scheduler',
    {
      // schedulerId: {
      //   type: Sequelize.UUID,
      //   primaryKey: true,
      //   references: {
      //     model: getSchedulerModel(conn),
      //     key: 'id',
      //   },
      // },
      // labId: {
      //   type: Sequelize.UUID,
      //   primaryKey: true,
      //   references: {
      //     model: getLabModel(conn),
      //     key: 'id',
      //   },
      // },
    },
    { tableName: 'lab_scheduler', timestamps: false }
  );
};
