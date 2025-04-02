const AuthService = require("../services/authService");
const User = require("../models/User");  

// ✅ 회원가입
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await AuthService.register(name, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ 로그인
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);

        console.log("✅ 로그인 응답 데이터:", result);
        res.json(result);
    } catch (error) {
        console.error("❌ 로그인 오류:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// ✅ 로그아웃
exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
        if (!token) throw new Error("토큰이 없습니다.");

        const result = await AuthService.logout(token);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ 프로필 조회 (getUserProfile)
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // JWT에서 추출한 사용자 ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
        }

        res.json({
            id: user.user_id,
            name: user.name,
            email: user.email,
            passwrod: user.password
        });
    } catch (error) {
        console.error("❌ 프로필 조회 오류:", error.message);
        res.status(500).json({ error: "서버 오류" });
    }
};

// ✅ 회원 정보 수정
exports.updateUser = async (req, res) => {
    try {
        const userId = req.user.id;  // 토큰에서 userId 가져옴
        const { name, password } = req.body;
        const result = await AuthService.updateUser(userId, name, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ 회원 탈퇴
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;  // 토큰에서 userId 가져옴
        const result = await AuthService.deleteUser(userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
