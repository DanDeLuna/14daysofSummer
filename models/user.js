const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Usuario extends Model {
  checkContrasena(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {

      async antesCreate(newUserInfo) {
        newUserInfo.password = await bcrypt.hash(newUserInfo.password, 10);
        return newUserInfo;
      },

      async antesUpdate(updatedUserInfo) {
        updatedUserInfo.password = await bcrypt.hash(updatedUserInfo.password, 10);
        return updatedUserInfo;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = Usuario;