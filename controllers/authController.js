const AuthService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await AuthService.register(name, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer 토큰 추출
        if (!token) throw new Error('토큰이 없습니다.');

        const result = await AuthService.logout(token);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const {name, password} = req.body;
        const result = await AuthService.updateUser(userId ,name, password)
        res.json(result);
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await AuthService.deleteUser(userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


