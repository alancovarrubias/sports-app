import { AUTH_TOKEN } from 'app/const'

export const getToken = (): string => {
    return localStorage.getItem(AUTH_TOKEN);
}

export const clearToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN)
}

export const setToken = (token: string): void => {
    localStorage.setItem(AUTH_TOKEN, token)
}