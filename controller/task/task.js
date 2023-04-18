const Task = require('../../model/tasks')
const createTableTask = (req, res) => {
    Task.createTable(req.conn, function (err, data) {
        if (err) return res.status(500).json({ ...err })
        res.status(201).json({ status: 1, message: "task table created" })
    })

}
const addTask = (req, res) => {
    Task.insert(req.conn, req.body, req.user.user.uid, function (err, data) {
        if (err) return res.status(500).json({ ...err })
        data.message="Task added successfully"
        res.status(200).json({...data })
    })

}
const updateTask = (req, res) => {
    const data=req.body
    const checkEmpty=data.title === undefined || data.description === undefined||data.title.length===0||data.description.length===0
    if (checkEmpty) return res.status(400).json({ message: "title or description cannot be empty" })
    getAuth(req, res)
        .then(data =>
            Task.update(req.conn, req.params.tid, req.body, function (err, data) {
                if (err) return res.status(500).json({ ...err })
                data.message=`Task with id ${req.params.tid} updated successfully`
                res.status(200).json({...data })
            })
        )
        .catch(err => res.status(err.status).json(err.msg))



}
const deleteTask = (req, res) => {

    getAuth(req, res)
        .then(data =>
            Task.delete(req.conn, req.params.tid, function (err, data) {
                if (err) return res.status(500).json({ ...err })
                data.message=`Task with id ${req.params.tid} deleted successfully`
                res.status(200).json({...data })
            })
        )
        .catch(err => res.status(err.status).json(err.message))

}
const getPosts = (req, res) => {
    Task.getAll(req.conn, function (err, data) {
        if (err) return res.status(500).json({ ...err })
        const userTask = data.filter(item => item.uid === req.user.user.uid)
        res.status(200).json({ userTask })
    })

}
const getTaskByID = (req, res) => {

    getAuth(req, res)
        .then(data => res.status(200).json({ data }))
        .catch(err => res.status(err.status).json(err.msg))

}
const getAuth = (req, res) => {
    const promise = new Promise(function (resolve, reject) {
        Task.getById(req.conn, req.params.tid, function (err, data) {
            if (err) return reject({ status: 500, msg: err })
            if (data.length == 0) return reject({ status: 404, message: "TASK NOT FOUND" })
            if (req.user.user.uid !== data[0].uid) return reject({ status: 403, message: "ACCESS DENIED" })
            return resolve(data)
        })

    })
    return promise
}

module.exports = { getPosts, createTableTask, addTask, updateTask, deleteTask, getTaskByID }