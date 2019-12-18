import Sequelize from 'sequelize';
import { connection } from '../connection';

const ApplyRecruitmentModel = connection.define(
  'apply_recruitment',
  {
    status: {
      type: Sequelize.TINYINT,
      defaultValue: 0
    }
  },
  { tableName: 'apply_recruitment', timestamps: false }
);

export { ApplyRecruitmentModel };
