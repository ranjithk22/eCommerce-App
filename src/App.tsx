import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux'
import type { RootState } from './store/Store'
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import LoadingIcon from './components/LoadingIcon';

function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const accessToken = localStorage.getItem('access_token')
  const [token, setToken] = useState<string>('')

  const { email } = useSelector((state: RootState) => state.userData.loggedInUser)

  useEffect(() => {
    setLoading(true)
  }, [email])

  useEffect(() => {
    if (typeof (accessToken) === 'string') {
      setToken(accessToken)
    }
  }, [accessToken])

  return (
    <>
      <BrowserRouter>
        <Navbar token={token} />
        {loading ? (
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              {email.length < 1 && <Route path="/login" element={<Login />} />}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[100vh]">
            <LoadingIcon />
          </div>
        )}
      </BrowserRouter>
    </>
  )
}

export default App
