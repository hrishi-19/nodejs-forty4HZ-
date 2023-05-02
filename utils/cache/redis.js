const { json } = require('express');
const {createClient} =require('redis')
const redisClient = createClient(6379);
(async () => {
    redisClient.on('error', (err) => {
      console.log('Redis Client Error', err);
    });
    redisClient.on('ready', () => console.log(`let's cache`));
  
    await redisClient.connect();
  
    await redisClient.ping();
  })();

  const setCache=async(key,value)=>{
    console.log(key,value)
        const cache_user=await redisClient.set(key.toString(),JSON.stringify(value))
        return cache_user
  }
  const getCache=async(req,res,next)=>{
    const tasks=await redisClient.get(req.user.user.uid.toString())
    if(tasks){
        console.log("tasks cache found")
        return res.json(JSON.parse(tasks))
    }
    console.log("tasks cache not found")
    next()
 
  }
  const clearCache=async(key)=>{
    
       await redisClient.del(key.toString())
        
  }
  module.exports={redisClient,setCache,getCache,clearCache}



