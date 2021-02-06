import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import {useAuth} from '../hooks/AuthContext';

export default function Signup(location) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const {login, currentUser} = useAuth();
    const history = useHistory();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (currentUser){
            history.push('/')
        }
    }, location.location.pathname)

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
          setError("")
          setLoading(true);
          await login(emailRef.current.value, passwordRef.current.value)
          history.push('/');
          window.location.reload()
        } catch {
          setError("Wrong email or password")
        }
        setLoading(false);
       }

        return (
            <div className="loginPage">
                <div className="formWrapper">
                    <div className="formTitle">Log In</div>

                    <Form className="form" onSubmit={handleSubmit}>
                        <Form.Group className="inputWrapper" id="email">
                            <Form.Control className="input" type="email" ref={emailRef} placeholder="Email" required />
                        </Form.Group>

                        <Form.Group className="inputWrapper" id="password">
                            <Form.Control className="input" type="password" ref={passwordRef} placeholder="Password" required />
                        </Form.Group>
                        {error && <Alert className="error" variant="danger">{error}</Alert>}
                        <Button className="formButton" disabled={loading} type="submit">
                            Log In
                        </Button>
                    </Form>

                    <div className="helpInfo">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
    )
}