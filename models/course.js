'use strict';
const { Model, DataTypes } = require('sequelize');

// Course Model
module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A title is required'
                },
                notEmpty: {
                    msg: 'Please provide a title'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required'
                },
                notEmpty: {
                    msg: 'Please provide a description'
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING
        },
        materialsNeeded: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, { sequelize });

    // Model Association
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: 'user',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
            },
        });
    };

    return Course;
};