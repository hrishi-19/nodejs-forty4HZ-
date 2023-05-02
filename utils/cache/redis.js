const { createClient } = require('redis')
const redisClient = createClient(6379);
(async () => {
  redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
  });
  redisClient.on('ready', () => console.log(`let's cache`));

  await redisClient.connect();

  await redisClient.ping();
})();


module.exports = { redisClient,}



