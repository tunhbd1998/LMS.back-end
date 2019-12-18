import { Sequelize } from 'sequelize';
import { connection } from '../connection';

const LabMemberModel = connection.define(
  'lab_member',
  {
    position: {
      type: Sequelize.TEXT,
      defaultValue: null
    }
  },
  { tableName: 'lab_member', timestamps: false }
);

export { LabMemberModel };
