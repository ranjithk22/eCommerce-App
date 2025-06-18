import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import supabase from '../config/supabase'

interface UserTypes {
    email: string,
    password: string
}
const Login = () => {
    const [currentUser, setCurrentUser] = useState<UserTypes>({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState<string>('')
    const navigate = useNavigate()
    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setCurrentUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: currentUser.email,
                password: currentUser.password,
            })
            console.log(data)
            if (data !== null) {
                localStorage.setItem('AccessToken', data?.session?.access_token as string);
                localStorage.setItem('IdAtLocalStorage', data?.user?.id as string);
                localStorage.setItem('EmailAtLocalStorage', data?.user?.email as string);
                navigate('/')
                window.location.reload()
            }
            if (error) {
                setErrorMessage(error.message)
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-[calc(100vh-100px)] flex items-center'>
            <div className=" w-[400px] mx-auto border-2 border-gray-300 my-3 rounded-2xl justify-center">
                <div className='p-3 w-[100%] text-center'>
                    <h1 className="text-2xl mb-3 text-center ">Login Page</h1>
                    <form method='POST' onSubmit={onSignIn}>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="">Email</label>
                            <input name="email" type="text" value={currentUser.email} placeholder="Enter Email" onChange={onValueChange} />
                        </div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="">Password</label>
                            <input name="password" type="password" value={currentUser.password} placeholder="Enter Password" onChange={onValueChange} />
                        </div>
                        <button type="submit" className="btn max-w-[200px] mx-auto">Sign In</button>
                        <p className='text-sm text-red-400 mt-2'>{errorMessage && (<>{errorMessage}, Try again</>)}</p>
                        <Link to='/signup' className='text-blue-400 font-bold text-sm'>Create new Account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
