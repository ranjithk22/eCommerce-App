import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import supabase from '../config/supabase'

interface UserTypes {
    email: string,
    password: string
}
const Signup = () => {
    const [currentUser, setCurrentUser] = useState<UserTypes>({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [userRegistered, setUserRegistered] = useState<boolean>(false)
    const navigate = useNavigate()

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setCurrentUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signUp({
                email: currentUser.email,
                password: currentUser.password,
                options: {
                    emailRedirectTo: 'https://example.com/welcome',
                },
            })
            if (data?.user?.identities?.length === 0) {
                setErrorMessage('user already exits, please login with credentials')

                const timer = setTimeout(() => {
                    clearInterval(timer)
                    navigate('/login')
                }, 3000)

            } else {
                if (data?.user?.identities) {
                    setUserRegistered(prev => !prev)
                }
                const timer = setTimeout(() => {
                    clearInterval(timer)
                    navigate('/login')
                }, 3000)
            }
            if (error) {
                console.log(error);
            }

        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-[calc(100vh-100px)] flex items-center'>
            <div className=" w-[400px] mx-auto border-2 border-gray-300 my-3 rounded-2xl justify-center">
                <div className='p-3 w-[100%] text-center'>
                    <h1 className="text-2xl mb-3 text-center ">Signup Page</h1>
                    <form method='POST' onSubmit={onSignUp}>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="">Email</label>
                            <input name="email" type="text" value={currentUser.email} placeholder="Enter Email" onChange={onValueChange} />
                        </div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="">Password</label>
                            <input name="password" type="password" value={currentUser.password} placeholder="Enter Password" onChange={onValueChange} />
                        </div>
                        <button type="submit" className="btn max-w-[200px] mx-auto">Create an Account</button>
                        {userRegistered && <p className='text-sm font-bold text-green-400 mt-2'>User Registered, Confirm email and login</p>}
                        <p className='text-sm text-red-400 mt-2'>{errorMessage}</p>

                        <Link to='/login' className='text-blue-400 font-bold text-sm'>Alerady created account? login here</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
