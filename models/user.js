'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "First name is required"
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Last name is required"
          }
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email is required"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password is required"
          }
        }
      },
    }
  );

  /**ASSOCIATIONS - Creates foreign key references*/
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Course); //Will add userID to Courses model
  };
  return User;
};