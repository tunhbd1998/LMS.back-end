import Sequelize from 'sequelize';

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

  return LabImageModel;
};
