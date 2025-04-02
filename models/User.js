const db = require('../config/db');

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // 이메일로 사용자 조회
    static async findByEmail(email) {
        const [rows] = await db.pool.execute('SELECT * FROM members WHERE email = ?', [email]);
        return rows.length ? rows[0] : null;
    }

    static async findById(user_id) {
        const [rows] = await db.pool.query('SELECT * FROM members WHERE user_id = ?', [user_id]);
        return rows.length > 0 ? new User(...Object.values(rows[0])) : null;
    }

    // 새로운 사용자 저장
    async save() {
        console.log("장할 데이터:", {
            name: this.name,
            email: this.email,
            password: this.password
        });

        await db.pool.execute(
            'INSERT INTO members (name, email, password) VALUES (?, ?, ?)', 
            [this.name, this.email, this.password]
        );
    }

    async update() {
        console.log("업데이트할 데이터:", {
            id: this.id,
            name: this.name,
            password: this.password,
        });

        await db.pool.execute(
            'UPDATE members SET name = ?, password = ? WHERE user_id = ?',
            [this.name, this.password, this.id]
        );
    }

}

module.exports = User;