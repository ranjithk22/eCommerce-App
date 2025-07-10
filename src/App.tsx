import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store/Store'
import { updateUserAfterAuth, type UserTypes } from './store/UserSlice';
import PrivateRoutes from './components/PrivateRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import SingleProduct from './pages/SingleProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const loggedInUser = useSelector((state: RootState) => state.userData.user)
  const [currentUser, setCurrentUser] = useState('')

  const IdAtLocalStorage = localStorage.getItem('IdAtLocalStorage')
  const EmailAtLocalStorage = localStorage.getItem('EmailAtLocalStorage')

  const dispatch = useDispatch<AppDispatch>()

  // CASE1: After Login assign current User
  useEffect(() => {
    setCurrentUser(loggedInUser.email)
  }, [loggedInUser])


  // CASE2: After refresh or New Session get user from localstorage
  useEffect(() => {
    if (IdAtLocalStorage !== null && EmailAtLocalStorage !== null) {
      dispatch(updateUserAfterAuth({ 'userId': IdAtLocalStorage, 'email': EmailAtLocalStorage }))
      setCurrentUser(EmailAtLocalStorage)
    }
  }, [IdAtLocalStorage, EmailAtLocalStorage])

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes currentUser={currentUser} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoutes currentUser={currentUser} />}>
          <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/products/:id" element={<SingleProduct />} />
          {currentUser === 'admin@test.com' && <Route path="/admin" element={<Admin />} />}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
