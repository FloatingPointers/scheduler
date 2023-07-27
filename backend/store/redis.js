const RedisStore = require("connect-redis");
const Redis = require("ioredis");

// Initialize client.
const redis = new Redis();
redis.connect().catch(console.error);

module.exports = {
  redis,
};