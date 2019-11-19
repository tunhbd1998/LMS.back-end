import Sequelize from 'sequelize';
import { getUserModel } from './user.model';
import { getLabAddressModel } from './lab-address.model';
import { getLabMemberModel } from './lab-member.model';
import { getSchedulerModel } from './scheduler.model';
import { getLabSchedulerModel } from './lab-scheduler.model';
// import { getLabMemberModel } from './lab-member.model';

export const getLabModel = conn => {
  const LabModel = conn.define(
    'lab',
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      university: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      // address: {
      //   type: Sequelize.UUID,
      //   allowNull: true,
      //   references: {
      //     model: getLabAddressModel(conn),
      //     key: 'labId',
      //   },
      // },
      labImage: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      confirmFile: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      // admin: {
      //   type: Sequelize.STRING,
      //   defaultValue: null,
      //   references: { model: getUserModel(conn), key: 'username' },
      // },
    },
    {
      tableName: 'lab',
      timestamps: false,
    }
  );

  const LabAddressModel = getLabAddressModel(conn);
  const UserModel = getUserModel(conn);
  const LabMemberModel = getLabMemberModel(conn);
  const SchedulerModel = getSchedulerModel(conn);
  const LabSchedulerModel = getLabSchedulerModel(conn);

  LabModel.belongsTo(LabAddressModel, {
    foreignKey: 'address',
    targetKey: 'labId',
    // constraints: false,
    timestamps: false,
  });
  LabModel.belongsToMany(UserModel, {
    through: LabMemberModel,
    foreignKey: 'labId',
    otherKey: 'userId',
    // constraints: false,
    timestamps: false,
  });
  LabModel.belongsTo(UserModel, {
    foreignKey: 'admin',
    targetKey: 'username',
    timestamps: false,
  });
  LabModel.belongsToMany(SchedulerModel, {
    through: LabSchedulerModel,
    foreignKey: 'labId',
    otherKey: 'schedulerId',
    timestamps: false,
  });

  return LabModel;
};
