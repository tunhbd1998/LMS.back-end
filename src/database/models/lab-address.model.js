import Sequelize from 'sequelize';
import { connection } from '../connection';

const LabAddressModel = connection.define(
  'lab_address',
  {
    labId: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    province: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    ward: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    detail: {
      type: Sequelize.TEXT,
      defaultValue: null
    }
  },
  {
    tableName: 'lab_address',
    timestamps: false
  }
);

export { LabAddressModel };
