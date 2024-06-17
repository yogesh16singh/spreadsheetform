const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FormEntry = sequelize.define("FormEntry", {
  formType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = FormEntry;
