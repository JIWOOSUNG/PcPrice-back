const { Sequelize } = require('sequelize');
require('dotenv').config();

// 환경변수
const host = process.env.HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_pwd = process.env.DB_PWD;

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(db_name, db_user, db_pwd, {
    host: host,
    port: db_port,
    dialect: 'mysql',  // MySQL 사용
    logging: false     // SQL 로그 출력 비활성화
});

// MySQL2 연결 풀(pool) 생성
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: host,
    port: db_port,
    user: db_user,
    password: db_pwd,
    database: db_name,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

module.exports = { sequelize, pool };
