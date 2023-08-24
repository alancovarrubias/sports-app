import React, { useContext } from 'react'
import { UserDispatchContext } from 'app/contexts/UserContext';
import { logoutAction } from 'app/actions/userActions';

const Home = (): JSX.Element => {
  const dispatch = useContext(UserDispatchContext)
  const handleLogout = () => {
    dispatch(logoutAction())
  }
  return (
    <>
      <div>Home</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Home