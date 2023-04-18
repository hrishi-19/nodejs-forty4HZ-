const User = require('../../model/user')
const crypto = require('crypto-js')
const JWT = require('jsonwebtoken')


const createTableUser = (req, res) => {
    User.createTable(req.conn, function (err, result) {
        if (err) throw err
        res.status(201).json({ status: 1, message: "user table created" })

    })
}

const register = (req, res) => {
    const data = req.body
    const checkEmpty=data.username === undefined || data.password === undefined||data.username.length===0||data.password.length===0
    if (checkEmpty) return res.status(400).json({ message: "username or password cannot be empty" })
    if(data.password.length<8) return res.status(400).json({ message: "password length must be 8 or more characters" })

    data.password = crypto.AES.encrypt(req.body.password, process.env.ENCRYPT_KEY).toString()
    User.insertUser(req.conn, data, function (err, data) {
        if (err){
            if(err.code==="ER_DUP_ENTRY") return res.status(409).json({message:"Username already exists"})
            return res.status(500).json({ ...err })
        }
        data.message="user created"
        res.status(201).json({...data })
    })

}
const login = (req, res) => {

    User.findUser(req.conn, req.body, function (err, rows) {
        if (rows.length === 0) return res.status(401).json({ message: "Invalid username or password" })
        if (err) return res.status(500).json({ ...err })
        let user = null

        const hashpwd = crypto.AES.decrypt(rows[0].password, process.env.ENCRYPT_KEY)
        const pswd = hashpwd.toString(crypto.enc.Utf8)
        if (pswd === req.body.password) {
            user = rows[0]
        }

        if (user === null) {
            res.status(401).json({ message: "Invalid username or password" })
        } else {
            const token = JWT.sign({
                user: user
            }, process.env.JWT_TOKEN, { expiresIn: "1 d" })
            const { password, ...userData } = user
            res.status(200).json({ userData, token })
        }

    })
}
const authenticateToken = (req, res, next) => {
    const header = req.headers['authorization']

    const token = header && header.split(' ')[1]

    if (token == null) return res.status(401).json({ message: "Not authenticated" })

    JWT.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) res.status(403).json({ message: "Invalid token" })
        req.user = user
        next()
    })
}


module.exports = { register, login, createTableUser, authenticateToken }