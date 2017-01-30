'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    department: DataTypes.STRING,
    experience: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  });
}
