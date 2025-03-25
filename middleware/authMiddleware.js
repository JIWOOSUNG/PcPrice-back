const jwt = require('jsonwebtoken');
const AuthService = require('../services/authService');
const SECRET_KEY = 'mysecretkey';

exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('토큰이 필요합니다.');

        if (AuthService.isTokenBlacklisted(token)) {
            throw new Error('토큰이 유효하지 않습니다.');
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // 요청 객체에 사용자 정보 추가
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
