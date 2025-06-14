import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/Store'
import { updateUserInStoreafterLogout } from '../store/UserSlice'

const Navbar = () => {
    const { email } = useSelector((state: RootState) => state.userData.user)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()



    const onSignOut = async () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem("EmailAtLocalStorage");
        localStorage.removeItem("IdAtLocalStorage");
        dispatch(updateUserInStoreafterLogout())
        navigate('/login')
        window.location.reload()
    }
    return (
        <div>
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
        </div>
    )
}

export default Navbar