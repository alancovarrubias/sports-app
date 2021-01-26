import React from 'react'
import { useHistory } from 'react-router-dom'
import { isLoggedInVar } from '../apollo/cache'

const Navbar = ({ isLoggedIn }) => {
    const history = useHistory()
    if (!isLoggedIn) {
        return null
    }
    const logout = () => {
        localStorage.clear()
        history.push('/login')
        isLoggedInVar(false)
    }
    const LogoutLink = () => {
        return (
            <a onClick={() => {
                logout()
            }}>Logout</a>
        )
    }
    return (
        <nav>
            <ul>
                <li><LogoutLink /></li>
                <li><LogoutLink /></li>
            </ul>
        </nav>
    )
}

export default Navbar
