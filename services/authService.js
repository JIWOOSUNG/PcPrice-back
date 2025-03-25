const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

class AuthService {
    // ✅ 회원가입
    static async register(username, email, password) {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new Error('이미 가입된 이메일입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(null, username, email, hashedPassword);
        await newUser.save();
        return { message: '회원가입 성공!' };
    }

    // ✅ 로그인
    static async login(email, password) {
        const user = await User.findByEmail(email);
        if (!user) throw new Error('존재하지 않는 이메일입니다.');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('비밀번호가 일치하지 않습니다.');

        const token = jwt.sign({ id: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        return { message: '로그인 성공!', token };
    }

    // ✅ 회원 탈퇴
    static async deleteUser(userId) {
        await User.deleteById(userId);
        return { message: '회원 탈퇴 완료' };
    }
}

module.exports = AuthService;
