//task queries
const { redisClient } = require('../utils/cache/redis')
module.exports = {
    createTable: function (conn, callback) {
        const sql = "CREATE TABLE taskapi.Tasks (tid INT AUTO_INCREMENT PRIMARY KEY,uid INT,title VARCHAR(255) NOT NULL,description VARCHAR(255) NOT NULL, status TINYINT DEFAULT 0,FOREIGN KEY (uid) REFERENCES Users(uid) ON DELETE CASCADE)";
        conn.query(sql, callback);
    },
    getAll: function (conn, callback) {
        const sql = "SELECT * FROM taskapi.Tasks";
        conn.query(sql, callback);
    },
    getById: async function (conn, user, tid, callback) {
        const item = await redisClient.get(tid.toString())
        
        if (item) {
            if(JSON.parse(item).uid===user.uid){
                callback(null, JSON.parse(item))
            }else{
                callback(null,[])
            }
        }
        else {
            const sql = `SELECT * FROM taskapi.Tasks WHERE tid='${tid}' AND uid='${user.uid}'`
            conn.query(sql, callback);
        }
    },
    insert: function (conn, data, uid, callback) {
        const sql = `INSERT INTO taskapi.Tasks SET title = '${data.title}', description = '${data.description}', uid='${uid}'`;
        conn.query(sql, callback);
    },
    update: function (conn, user, tid, data, callback) {
        const sql = `UPDATE taskapi.Tasks SET title = '${data.title}', description = '${data.description}',status='${data.status}' WHERE tid='${tid}' AND uid='${user.uid}'`;
        conn.query(sql, callback);
    },
    delete: function (conn, user, tid, callback) {
        const sql = `DELETE FROM taskapi.Tasks WHERE tid='${tid}' AND uid='${user.uid}'`;
        conn.query(sql, callback);
    },

}