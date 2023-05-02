const mysqli=require('mysql2')

module.exports=mysqli.createConnection({
    host:'localhost',
    user:'root',
    password:'Qwerty1234567',
    port: 3306,
    ssl: {
        rejectUnauthorized: false
    }
    
})