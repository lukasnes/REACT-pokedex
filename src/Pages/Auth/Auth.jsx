import axios from 'axios'
import './Auth.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const navigate = useNavigate()
    const [loginUser,setLoginUser] = useState("")
    const [loginPass,setLoginPass] = useState("")

    const [registerUser,setRegisterUser] = useState("")
    const [registerEmail,setRegisterEmail] = useState("")
    const [registerPass,setRegisterPass] = useState("")
    const [registerRePass,setRegisterRePass] = useState("")

    const handleLogin = async(evt) =>{
        evt.preventDefault()
        const {data} = await axios.post('/dex/auth', {username: loginUser, password: loginPass})

        setLoginUser("")
        setLoginPass("")
        if(data.success){
            navigate('/')
        }
    }

    const handleRegister = async(evt) => {
        evt.preventDefault()
        if(registerPass === registerRePass){
            const {data} = await axios.post('/dex/register', {
                username: registerUser,
                email: registerEmail,
                password: registerPass
            })

            setRegisterUser("")
            setRegisterEmail("")
            setRegisterPass("")
            setRegisterRePass("")
            if(data.success){
                navigate('/')
            }
        } else {
            alert("Your passwords need to match!")
            setRegisterPass("")
            setRegisterRePass("")
        }
    }

    return (
        <section id="auth-section">
            <form 
                id="login-form" 
                className="auth-form"
                onSubmit={handleLogin}
            >
                <div className="input-container">
                    <label htmlFor="user">Username: </label>
                    <input
                        id="user" 
                        type="text"
                        placeholder='Enter your username...'
                        required
                        value={loginUser}
                        onChange={(evt) => setLoginUser(evt.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="login-password">Password: </label>
                    <input 
                        id="login-password"
                        type="password"
                        placeholder='Enter your password...'
                        required
                        value={loginPass}
                        onChange={(evt) => setLoginPass(evt.target.value)}
                    />
                </div>
                <button>Login</button>
            </form>
            <form 
                id="register-form" 
                className="auth-form"
                onSubmit={handleRegister}
            >
                <div className="input-container">
                    <label htmlFor="new-user">Username: </label>
                    <input 
                        id="new-user"
                        type="text" 
                        placeholder="Enter your username..."
                        required
                        value={registerUser}
                        onChange={(evt) => setRegisterUser(evt.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="new-email">Email: </label>
                    <input 
                        id="new-email"
                        type="text"
                        placeholder="Enter your email..."
                        required
                        value={registerEmail}
                        onChange={(evt) => setRegisterEmail(evt.target.value)} 
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="new-pass">Password: </label>
                    <input 
                        id="new-pass"
                        type="password" 
                        placeholder="Enter your password..."
                        required
                        value={registerPass}
                        onChange={(evt) => setRegisterPass(evt.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="re-pass">Re-enter Password: </label>
                    <input 
                        id="re-pass"
                        type="password"
                        placeholder="Re-enter your password..."
                        required
                        value={registerRePass}
                        onChange={(evt) => setRegisterRePass(evt.target.value)} 
                    />
                </div>
                <button>Register</button>
            </form>
        </section>
    )
}

export default Auth