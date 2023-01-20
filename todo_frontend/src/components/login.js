import React, { useState } from 'react'
import axios from 'axios';
import { setAuthToken } from './setAuthToken';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState([]);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loginPayload = {
            identifier: email,
            password: password
        }

        axios.post("http://localhost:1337/api/auth/local", loginPayload)
            .then(response => {
                //get token from response
                const token = response.data.jwt;
                const user = response.data.user;

                //set JWT token to session storage
                sessionStorage.setItem("token", token);

                //set user details to session storage
                sessionStorage.setItem("user", JSON.stringify(user));

                //set token to axios common header
                setAuthToken(token);

                //redirect user to home page
                window.location.href = '/'
            })
            .catch(err => { setErrorMsg(err.response.data.error) });
    };

    return (
        <div className='login'>
            <div>{errorMsg.name}</div>
            <h1>TaskTrakr</h1>
            <form className="login_form" onSubmit={handleSubmit}>
                <div className='form_input'>
                    <label htmlFor="email-address">Email / Username</label>
                    <input id="email-address" name="email" type="email" required placeholder="Email / Username" value={email} onChange={event => setEmail(event.target.value)} />
                </div>
                <div className='form_input'>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
                </div>

                <button className='btn btn-primary' type="submit" >
                    Sign in
                </button>
            </form>
        </div>
    )
}

export default Login