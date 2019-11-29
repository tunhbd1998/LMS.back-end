import Sequelize from 'sequelize';
import { getUserModel } from './user.model';
import { getLabAddressModel } from './lab-address.model';
import { getLabMemberModel } from './lab-member.model';
import { getSchedulerModel } from './scheduler.model';
import { getLabSchedulerModel } from './lab-scheduler.model';
import { getLabModel } from './lab.model';

export const getLabImageModel = conn => {
  const LabImageModel = conn.define(
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

  const LabModel = getLabModel(conn);

  LabImageModel.belongsTo(LabModel, {
    foreignKey: 'labId',
    targetKey: 'id',
    // constraints: false,
    timestamps: false
  });

  return LabImageModel;
};
