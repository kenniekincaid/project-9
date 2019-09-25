'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "User ID is required"
          }
        }
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Course title is required"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Description is required"
          }
        }
      },
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING
    }
  );

  /**ASSOCIATIONS - Creates foreign key references*/
  Course.associate = function(models) {
    // associations can be defined here
    Course.belongsTo(models.User); //Adds a course to a User
  };
  return Course;
};