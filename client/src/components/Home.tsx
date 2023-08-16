import React from 'react'
import { useHistory } from 'react-router-dom'
import { Paths } from 'app/const';
import { clearToken } from 'app/utils/auth';

const Home = (): JSX.Element => {
  const history = useHistory()
  const handleLogout = () => {
    clearToken()
    history.push(Paths.Login)
  }
  return (
    <>
      <div>Home</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Home