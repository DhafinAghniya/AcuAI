const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Forum = sequelize.define("Forum", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true, // untuk createdAt dan updatedAt
});

module.exports = Forum;
