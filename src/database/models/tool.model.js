import Sequelize from 'sequelize';
import { getLabModel } from './lab.model';

export const getToolModel = conn => {
  const ToolModel = conn.define(
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
      // labId: {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      //   references: {
      //     model: getLabModel(conn),
      //     key: 'id',
      //   },
      // },
    },
    { tableName: 'tool', timestamps: false }
  );

  const LabModel = getLabModel(conn);

  ToolModel.belongsTo(LabModel, {
    as: 'ofLab',
    foreignKey: 'labId',
    targetKey: 'id',
    timestamps: false
  });

  return ToolModel;
};
