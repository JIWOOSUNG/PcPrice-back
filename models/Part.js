const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Part = sequelize.define('Part', {
    part_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true }, // ✅ 중복 방지 (unique: true)
    manufacturer: { type: DataTypes.STRING(100) },
    price: { type: DataTypes.DECIMAL(10,2) },
    productUrl: { type: DataTypes.TEXT, field: 'product_url' },
    imageUrl: { type: DataTypes.TEXT, field: 'image_url' },
    specList: { type: DataTypes.TEXT, field: 'spec_list' }
}, {
    tableName: 'parts',
    timestamps: false
});

module.exports = Part;
