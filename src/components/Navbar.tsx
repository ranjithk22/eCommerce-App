import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/Store'
import { updateUserInStoreAfterAuth, updateUserInStoreafterLogout } from '../store/UserSlice'
import axios from 'axios'

const Navbar = () => {
    const { email } = useSelector((state: RootState) => state.userData.loggedInUser)
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        if (accessToken) {

            const authAcesss = async () => {
                try {
                    const res = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    })
                    const data = res.data
                    dispatch(updateUserInStoreAfterAuth({ email: data.email }))
                    setUserInLocalStorage({ email: data.email })
                } catch (error) {
                    console.log(error)
                }
            }
            authAcesss()
        }

    }, [accessToken])

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