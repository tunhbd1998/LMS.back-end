import Sequelize from 'sequelize';

export const getUserModel = conn => {
  return conn.define(
    'user',
    {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING
      },
      avatarImage: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      fullname: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      IDCardNumber: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      university: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      IDNumber: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      role: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      isTeacher: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      // labId: {
      //   type: Sequelize.UUID,
      //   defaultValue: null,
      //   references: {
      //     model: getLabModel(conn),
      //     key: 'id'
      //   }
      // },
      isAccepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'user',
      timestamps: false
    }
  );
};
