import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/Store'
import { updateUserInStoreafterLogout } from '../store/UserSlice'
import { useEffect, useState } from 'react'
import { updateUserInStoreAfterAuth } from '../store/UserSlice'
import axios from 'axios'

const Navbar = ({ token }: { token: string }) => {
    const { email } = useSelector((state: RootState) => state.userData.loggedInUser)
    const dispatch = useDispatch<AppDispatch>()

    console.log('Navbar Page: ', token)
    useEffect(() => {
        if (token.length > 0) {
            (async () => {
                try {
                    console.log('Auth for user: ', token)
                    const res = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const data = res.data
                    dispatch(updateUserInStoreAfterAuth({ email: data.email }))
                    setUserInLocalStorage({ email: data.email })
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [token])

    const setUserInLocalStorage = (user: { email: string }) => {
        localStorage.setItem(
            "UserInStorage",
            JSON.stringify({
                email: user.email,
                // uid: user.uid,
            })
        );
    };

    const onSignOut = async () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem("UserInStorage");
        dispatch(updateUserInStoreafterLogout({ 'email': '' }))
    }
    return (
        <header>
            <nav className="nav container flex justify-between">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <ul className='flex items-center'>
                    {email.length > 0 ? (
                        <>
                            <li>HI {email}</li>
                            <li> <button className="btn-sm" onClick={onSignOut}>Sign Out</button></li>
                        </>

                    ) : <li> <Link to="/login">Login</Link></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar