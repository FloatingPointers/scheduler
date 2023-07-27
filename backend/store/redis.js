const RedisStore = require("connect-redis");
const Redis = require("ioredis");

// Initialize client.
const redis = new Redis();
console.log("Connected to Redis");

module.exports = {
  redis,
};