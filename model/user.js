//user queries
module.exports = {
    createTable: function (conn, callback) {
        const sql = "CREATE TABLE taskapi.Users (uid INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(255) UNIQUE NOT NULL,password VARCHAR(255) NOT NULL)";
        conn.query(sql, callback);
    },
    insertUser: function (conn, data, callback) {
        const sql = `INSERT INTO taskapi.Users SET  username = '${data.username}', password = '${data.password}'`
        conn.query(sql, callback)
    },
    findUser: function (conn, data, callback) {
        const sql = `SELECT * FROM taskapi.Users where username = '${data.username}'`
        conn.query(sql, callback)
    },
}