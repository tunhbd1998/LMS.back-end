import Sequelize from 'sequelize';
// import { getSchedulerModel } from './scheduler.model';
// import { getProjectModel } from './project.model';

export const getProjectSchedulerModel = conn => {
  return conn.define(
    'project_scheduler',
    {
      // schedulerId: {
      //   type: Sequelize.UUID,
      //   primaryKey: true,
      //   references: {
      //     model: getSchedulerModel(conn),
      //     key: 'id',
      //   },
      // },
      // projectId: {
      //   type: Sequelize.UUID,
      //   primaryKey: true,
      //   references: {
      //     model: getProjectModel(conn),
      //     key: 'id',
      //   },
      // },
    },
    { tableName: 'project_scheduler', timestamps: false }
  );
};
