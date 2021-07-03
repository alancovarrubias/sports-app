import { InMemoryCache, makeVar } from '@apollo/client';
import { AUTH_TOKEN } from 'app/const'

// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem(AUTH_TOKEN));

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: { read() { return isLoggedInVar() } },
            }
        },
    },
})
