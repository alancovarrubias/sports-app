import { InMemoryCache, makeVar } from '@apollo/client';
import { AUTH_TOKEN } from '../const'

// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem(AUTH_TOKEN));

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: { read() { return isLoggedInVar() } },
                games: {
                    keyArgs: ['season_id'],
                    merge(existing = [], incoming) {
                        return [...existing, ...incoming]
                    }
                }
            }
        },
        Season: {
            keyFields: ['id', 'sport'],
        },
        Game: {
            keyFields: ['id', 'sport'],
        },
        Player: {
            keyFields: ['id', 'sport'],
        },
    },
})
