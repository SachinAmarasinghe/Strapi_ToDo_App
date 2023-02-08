import React, { useState } from 'react'
import axios from 'axios';
import { setAuthToken } from './setAuthToken';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { Link } from 'react-router-dom';

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
        <div>
            <Row justify="center">
                <Col span={6}>
                    <div>{errorMsg.name}</div>
                    <h1>TaskTrakr</h1>
                </Col>
            </Row>
            <Row>
                <Col span={6} offset={9}>
                    <Card>
                        <Form layout='vertical' onSubmit={handleSubmit} >

                            <Form.Item label='Email / Username' name='email'>
                                <Input id="email-address" required placeholder="Email / Username" value={email} onChange={event => setEmail(event.target.value)} />
                            </Form.Item>

                            <Form.Item label="Password" name="password">
                                <Input id="password" type="password" required placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Login