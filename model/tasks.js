//task queries
module.exports = {
    createTable: function (conn, callback) {
        const sql = "CREATE TABLE Tasks (tid INT AUTO_INCREMENT PRIMARY KEY,uid INT,title VARCHAR(255) NOT NULL,description VARCHAR(255) NOT NULL, status TINYINT DEFAULT 0,FOREIGN KEY (uid) REFERENCES Users(uid) ON DELETE CASCADE)";
        conn.query(sql, callback);
    },
    getAll: function (conn, callback) {
        const sql = "SELECT * FROM Tasks";
        conn.query(sql, callback);
    },
    getById:function(conn,tid,callback){
        const sql=`SELECT * FROM Tasks WHERE tid='${tid}' `
        conn.query(sql, callback);
    },
    insert: function (conn, data, uid, callback) {
        const sql = `INSERT INTO Tasks SET title = '${data.title}', description = '${data.description}', uid='${uid}'`;
        conn.query(sql, callback);
    },
    update: function (conn, tid, data, callback) {
        const sql = `UPDATE Tasks SET title = '${data.title}', description = '${data.description}',status='${data.status}' WHERE tid='${tid}'`;
        conn.query(sql, callback);
    },
    delete: function (conn, tid, callback) {
        const sql = `DELETE FROM Tasks WHERE tid='${tid}'`;
        conn.query(sql, callback);
    },

}