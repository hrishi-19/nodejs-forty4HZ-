const mysqli=require('mysql')

module.exports=mysqli.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'task_api'
    
})