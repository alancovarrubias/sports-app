import { GraphQLError } from "graphql";
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { Resolvers } from "@app/__generated__/resolvers-types";

const pubsub = new RedisPubSub({
  publisher: new Redis({
    host: 'redis',
    port: 6379,
  }),
  subscriber: new Redis({
    host: 'redis',
    port: 6379,
  })
});


const withAuthentication = (resolverFunction) => {
  return async (root, args, context) => {
    if (!context.user) {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
    return await resolverFunction(root, args, context);
  };
};

const resolveData = ({ data }) => {
  if (!data) {
    return null;
  }
  return data.attributes;
};

const GAME_UPDATED = 'GAME_UPDATED';
const resolvers: Resolvers = {
  Query: {
    currentUser: withAuthentication((_root, _args, { user }) => {
      return user;
    }),
    seasons: withAuthentication(
      async (_root, _args, { dataSources: { footballApi } }) => {
        const res = await footballApi.fetchSeasons();
        const body = await res.json();
        return body.data.map((season) => season.attributes);
      }
    ),
    games: withAuthentication(
      async (_root, args, { dataSources: { footballApi } }) => {
        const res = await footballApi.fetchGames(args.date);
        const body = await res.json();
        const data = body.data.map(({ attributes }) => {
          return {
            ...attributes,
            away_full_game_stat: resolveData(attributes.away_full_game_stat),
            home_full_game_stat: resolveData(attributes.home_full_game_stat),
            away_first_half_stat: resolveData(attributes.away_first_half_stat),
            home_first_half_stat: resolveData(attributes.home_first_half_stat),
          };
        });
        return data;
      }
    ),
  },
  Mutation: {
    login: async (_root, args, { dataSources: { authApi } }) => {
      const res = await authApi.attemptLogin(args);
      const body = await res.json();
      return body;
    },
  },
  Subscription: {
    gameUpdated: {
      subscribe: () => pubsub.asyncIterator(GAME_UPDATED) as unknown as AsyncIterable<any>,
      resolve: (payload) => payload
    },
  },
};

const redisSubscriber = new Redis({
  host: 'redis',
  port: 6379,
});
const redisPublisher = new Redis({
  host: 'redis',
  port: 6379,
});
console.log('outside')
redisSubscriber.subscribe('game_updates', (err, message: string) => {
  console.log('inside')
  if (err) {
    console.error('Redis subscription error:', err);
  } else {
    console.log('Subscribed to game_updates');
  }
  const gameUpdate = JSON.parse(message);
  pubsub.publish(GAME_UPDATED, { gameUpdated: gameUpdate });
});
redisSubscriber.on('message', (channel, message) => {
  console.log(`Received message on ${channel}: ${message}`);
});
setTimeout(() => {
  const testMessage = JSON.stringify({ message: 'Hello from Publisher!' });
  redisPublisher.publish('game_updates', testMessage, (err, count) => {
    if (err) {
      console.error('Publish error:', err);
    } else {
      console.log(`Message published to ${count} subscriber(s)`);
    }
  });
}, 1000);

export default resolvers;
