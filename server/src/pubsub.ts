import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const redisOptions = {
    host: 'redis',
    port: 6379,
};
const redisClient = new Redis(redisOptions);
const pubsub = new RedisPubSub({
    publisher: redisClient,
    subscriber: redisClient,
});

export default pubsub;
