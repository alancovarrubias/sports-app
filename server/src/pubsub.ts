import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL ?? 'redis://redis:6379');
const pubsub = new RedisPubSub({
    publisher: redisClient,
    subscriber: redisClient,
});

export default pubsub;
