import Sequelize from 'sequelize';
import { getUserModel } from './user.model';

export const getLabModel = conn => {
  return conn.define(
    'lab',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: {
        type: Sequelize.TEXT
      },
      university: {
        type: Sequelize.TEXT
      },
      labImage: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      confirmFile: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      address: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      admin: {
        type: Sequelize.STRING,
        defaultValue: null,
        references: { model: getUserModel(conn), key: 'username' }
      }
    },
    {
      tableName: 'lab',
      timestamps: false
    }
  );
};
