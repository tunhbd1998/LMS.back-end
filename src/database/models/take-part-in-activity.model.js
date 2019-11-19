import Sequelize from 'sequelize';
// import { getActivityModel } from './activity.model';
// import { getUserModel } from './user.model';

export const getTakePartInActivityModel = conn => {
  return conn.define(
    'take_part_in_activity',
    {
      // activityId: {
      //   type: Sequelize.UUID,
      //   primaryKey: true,
      //   references: {
      //     model: getActivityModel(conn),
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
    },
    { tableName: 'take_part_in_activity', timestamps: false }
  );
};
