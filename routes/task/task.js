const { getPosts, createTableTask, addTask, updateTask, deleteTask, getTaskByID } = require('../../controller/task/task')
const { authenticateToken } = require('../../controller/user/user')
const { getCache } = require('../../utils/cache/redis')

const router = require('express').Router()


//task routes
router.get('/createtabletask', createTableTask)
router.get('/', authenticateToken,getCache,getPosts)
router.get('/:tid',authenticateToken,getTaskByID)
router.post('/', authenticateToken, addTask)
router.put('/:tid', authenticateToken, updateTask)
router.delete('/:tid', authenticateToken, deleteTask)

module.exports = router