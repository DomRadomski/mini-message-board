const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM posted_messages");
    return rows;
}

async function getMessageById(id) {
    const { rows } = await pool.query("SELECT * FROM posted_messages WHERE id = $1", [id]);
    return rows[0];
}

async function insertMessage(text, username) {
    await pool.query("INSERT INTO posted_messages (text, username) VALUES ($1,$2)", [text, username])
}

module.exports = {
    getAllMessages,
    getMessageById,
    insertMessage
}