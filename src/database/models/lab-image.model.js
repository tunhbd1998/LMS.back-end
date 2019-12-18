import Sequelize from 'sequelize';
import { connection } from '../connection';

const LabImageModel = connection.define(
  'lab_image',
  {
    labId: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    imageId: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'lab_image',
    timestamps: false
  }
);

export { LabImageModel };
