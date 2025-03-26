const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const blacklist = new Set(); // 로그아웃된 토큰 저장 (임시)

class AuthService {
    // 회원가입
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

    // 로그인
    static async login(email, password) {
        const user = await User.findByEmail(email);
        if (!user) throw new Error('존재하지 않는 이메일입니다.');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('비밀번호가 일치하지 않습니다.');

        const token = jwt.sign({ id: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        return { message: '로그인 성공!', token };
    }

    // ✅ 로그아웃
    static async logout(token) {
        blacklist.add(token); // 토큰을 블랙리스트에 추가
        return { message: '로그아웃 성공!' };
    }

    // ✅ 블랙리스트 확인 함수 (JWT 검증 시 활용 가능)
    static isTokenBlacklisted(token) {
        return blacklist.has(token);
    }

    // 회원수정
    static async updateUser(userId, name, password) {
        const user = await User.findById(userId);
        if (!user) throw new Error('사용자를 찾을 수 없습니다.');

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);
        user.name = name;
        user.password = hashedPassword;

        await user.update();
        return { message: '회원 정보가 수정되었습니다.' };
    }

    // ✅ 회원 탈퇴
    static async deleteUser(userId) {
        await User.deleteById(userId);
        return { message: '회원 탈퇴 완료' };
    }
}

module.exports = AuthService;
