import Sequelize from 'sequelize';
import { connection } from '../connection';
import { LabModel } from './lab.model';

const ToolModel = connection.define(
  'tool',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    amount: {
      type: Sequelize.TINYINT,
      defaultValue: 0
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: null
    }
  },
  { tableName: 'tool', timestamps: false }
);

ToolModel.belongsTo(LabModel, {
  as: 'ofLab',
  foreignKey: 'labId',
  targetKey: 'id',
  timestamps: false
});

export { ToolModel };
