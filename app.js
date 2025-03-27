const express = require('express');
const app = express();
const pool = require('./config/db.js');
const { sequelize } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const partRoutes = require('./routes/partRoutes');
const reviewRoutes = require('./routes/reviewRoutes')

// 환경변수
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/parts', partRoutes);
app.use("/api/reviews", reviewRoutes);

// 루트 경로
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 데이터베이스 연결 및 동기화
sequelize.sync()
  .then(() => {
    console.log('✅ Database connected and synchronized!');
    // 서버 시작
    app.listen(port, () => {
      console.log('Server Connected: http://' + host + ':' + port);
    });
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
  });

// 서버 종료 시, Pool 종료
process.on('SIGINT', () => {
  pool.end(() => {
      console.log('Database pool closed');
      process.exit(0);
  });
});
process.on('SIGTERM', () => {
  pool.end(() => {
      console.log('Database pool closed');
      process.exit(0);
  });
});
