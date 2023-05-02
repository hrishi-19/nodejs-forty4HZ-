const Task = require('../../model/tasks')
const { redisClient } = require('../../utils/cache/redis')
const createTableTask = (req, res) => {
    Task.createTable(req.conn, function (err, data) {
        if (err) return res.status(500).json({ ...err })
        res.status(201).json({ status: 1, message: "task table created" })
    })

}


const addTask = (req, res) => {
    const checkEmpty = req.body.title === undefined || req.body.description === undefined || req.body.title.length === 0 || req.body.description.length === 0
    if (checkEmpty) return res.status(400).json({ message: "title or description cannot be empty" })
    Task.insert(req.conn, req.body, req.user.user.uid, function (err, data) {
        if (err) return res.status(500).json({ ...err })
        data.message = "Task added successfully"
        res.status(200).json({ ...data })
    })

}
const updateTask = (req, res) => {
    const data = req.body
    const checkEmpty = data.title === undefined || data.description === undefined || data.title.length === 0 || data.description.length === 0
    if (checkEmpty) return res.status(400).json({ message: "title or description cannot be empty" })
  
            Task.update(req.conn,req.user.user, req.params.tid, req.body, function (err, data) {
                if (err) return res.status(500).json({ ...err })
                redisClient.del(req.params.tid.toString())
                data.message = `Task with id ${req.params.tid} updated successfully`
                res.status(200).json({ ...data })
            })
        


}
const deleteTask = (req, res) => {

            Task.delete(req.conn, req.user.user,req.params.tid, function (err, data) {
                  if (err) return res.status(500).json({ ...err })
                   redisClient.del(req.params.tid.toString())
                    data.message = `Task with id ${req.params.tid} deleted successfully`

                     res.status(200).json({ ...data })
                
            })
      

}
const getPosts = (req, res) => {
    Task.getAll(req.conn, function (err, data) {
        if (err) return res.status(500).json({ ...err })
        const userTask = data.filter(item => item.uid === req.user.user.uid)
        res.status(200).json({ userTask })
    })

}
const getTaskByID = (req, res) => {
    Task.getById(req.conn,req.user.user,req.params.tid,function(err,data){
        if (err) return res.status(500).json({ ...err })
        if(data.length>0)redisClient.set(req.params.tid.toString(),JSON.stringify(data[0]))
            
       
        res.status(200).json({ data })
    })

    

}


module.exports = { getPosts, createTableTask, addTask, updateTask, deleteTask, getTaskByID }