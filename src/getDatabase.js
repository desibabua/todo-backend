const redis = require('redis');
const { DbClient } = require('./dbClient');

const getRedisClient = function () {
  if (process.env.REDISCLOUD_URL) {
    return redis.createClient(process.env.REDISCLOUD_URL, {
      no_ready_check: true,
    });
  }
  return redis.createClient();
};

module.exports = { db: new DbClient(getRedisClient()) };
