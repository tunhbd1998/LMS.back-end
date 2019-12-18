import Sequelize from 'sequelize';
import { connection } from '../connection';
import { SchedulerModel } from './scheduler.model';
import { UserModel } from './user.model';
import { LabAddressModel } from './lab-address.model';
import { LabMemberModel } from './lab-member.model';
import { LabSchedulerModel } from './lab-scheduler.model';
import { LabImageModel } from './lab-image.model';

const LabModel = connection.define(
  'lab',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    university: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    specialize: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    confirmFile: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: null
    }
  },
  {
    tableName: 'lab',
    timestamps: false
  }
);

LabModel.belongsTo(LabAddressModel, {
  as: 'address',
  foreignKey: 'addressId',
  targetKey: 'labId',
  // constraints: false,
  timestamps: false
});
LabModel.belongsToMany(UserModel, {
  through: LabMemberModel,
  foreignKey: 'labId',
  otherKey: 'userId',
  // constraints: false,
  timestamps: false
});
LabModel.belongsTo(UserModel, {
  as: 'admin',
  foreignKey: 'adminId',
  targetKey: 'username',
  timestamps: false
});
LabModel.belongsToMany(SchedulerModel, {
  through: LabSchedulerModel,
  foreignKey: 'labId',
  otherKey: 'schedulerId',
  timestamps: false
});
LabModel.hasMany(LabImageModel, {
  foreignKey: 'labId',
  sourceKey: 'id',
  as: 'images',
  timestamps: false
});

export { LabModel };
