'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotsImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotsImage.belongsTo(models.Spot, { foreignKey: "spotId" })
    }
  }
  SpotsImage.init({
    spotId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SpotsImage',
    scopes: {
      preview: {
        attributes: { exclude: ["url","spotId","createdAt", "updatedAt"] }
      },
      create: {
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }
    }
  });
  return SpotsImage;
};
