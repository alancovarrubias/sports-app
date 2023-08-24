export const LOGIN = 'LOGIN'
export const loginAction = ({ user, token }) => ({ type: LOGIN, payload: { user, token } })

export const LOGOUT = 'LOGOUT'
export const logoutAction = () => ({ type: LOGOUT })
