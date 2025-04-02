class Review {
    constructor(review_id, part_id, part_name, user_id, rating, content, created_at) {
        this.review_id = review_id;
        this.part_id = part_id;
        this.part_name = part_name;
        this.user_id = user_id;
        this.rating = rating;
        this.content = content;
        this.created_at = created_at;
    }

    async save() {
        const [result] = await db.pool.execute(
            `INSERT INTO reviews (part_id, part_name, user_id, rating, content, created_at) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [this.part_id, this.part_name, this.user_id, this.rating, this.content, new Date()]
        );
        this.review_id = result.insertId;
    }

    // 특정 부품에 대한 모든 리뷰 조회 (이름도 반환)
    static async findByPartId(part_id) {
        const [rows] = await db.pool.execute(
            `SELECT r.*, u.name AS user_name 
             FROM reviews r 
             JOIN members u ON r.user_id = u.user_id 
             WHERE r.part_id = ?`,
            [part_id]
        );
        return rows;
    }
}
