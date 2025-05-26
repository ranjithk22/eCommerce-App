import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

interface UserTypes {
    email: string,
    password: string
}
const Login = () => {
    const [user, setUser] = useState<UserTypes>({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState<string>('')
    const navigate = useNavigate()

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                email: user.email,
                password: user.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            localStorage.setItem('access_token', res.data.access_token);
            navigate('/')
        } catch (error) {
            alert('Given credentials are there')
            // setErrorMessage(error as string)
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
                            <input name="email" type="text" value={user.email} placeholder="Enter Email" onChange={onValueChange} />
                        </div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="">Password</label>
                            <input name="password" type="password" value={user.password} placeholder="Enter Password" onChange={onValueChange} />
                        </div>
                        <button type="submit" className="btn max-w-[200px] mx-auto">Sign In</button>
                        <p className='text-sm text-red-400'>{errorMessage}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
