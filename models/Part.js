const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Part = sequelize.define('Part', {
    part_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    manufacturer: { type: DataTypes.STRING(100) },
    price: { type: DataTypes.DECIMAL(10,2) },
    productUrl: { 
        type: DataTypes.TEXT,
        field: 'product_url' // ✅ DB 컬럼명 명시
    },
    imageUrl: { 
        type: DataTypes.TEXT,
        field: 'image_url' // ✅ DB 컬럼명 명시
    }
}, {
    tableName: 'parts',
    timestamps: false
});

module.exports = Part;
