export const getProjectMemberModel = conn => {
  return conn.define(
    'project_member',
    {
      // projectId: {
      //   type: Sequelize.UUID,
      //   primaryKey: true,
      //   references: {
      //     model: getProjectModel(conn),
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
    {
      tableName: 'project_member',
      timestamps: false
    }
  );
};
