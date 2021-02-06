import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import {useAuth} from '../hooks/AuthContext';
import {projectFirestore, timestamp} from '../firebase/config';

export default function Signup(location) {
    const handleRef = useRef();
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const {signup, currentUser} = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (currentUser){
            history.push('/')
        }
    }, location.location.pathname)

    async function handleSubmit(e) {
        e.preventDefault()
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        try {
          setError("")
          console.log("pre cred", emailRef.current.value, passwordRef.current.value, handleRef.current.value)
          const credentials = {
              email: emailRef.current.value,
              password: passwordRef.current.value,
              createdAt: timestamp(),
              handle: handleRef.current.value,
              bio: ''
          }
          await projectFirestore.doc(`users/${credentials.email}`).set({
            ...credentials
          })

          await signup(credentials.email, credentials.password);
          history.push('/');
          window.location.reload();
  
            
        } catch {
          setError("Failed to create an account")
        }
      }

    return (
        <div className="formWrapper">
            <h2 className="formTitle">Sign Up</h2>

            <Form className="form" onSubmit={handleSubmit}>
                <Form.Group className="inputWrapper" id="handle">
                    <Form.Control className="input" type="handle" ref={handleRef} placeholder="Handle" required />
                </Form.Group>

                <Form.Group className="inputWrapper" id="email">
                    <Form.Control className="input" type="email" ref={emailRef} placeholder="Email" required />
                </Form.Group>

                <Form.Group className="inputWrapper" id="password">
                    <Form.Control className="input" type="password" ref={passwordRef} placeholder="Password" required />
                </Form.Group>

                <Form.Group className="inputWrapper" id="password-confirm">
                    <Form.Control className="input" type="password" ref={passwordConfirmRef} placeholder="Confirm password" required />
                </Form.Group>
                {error && <Alert className="error" variant="danger">{error}</Alert>}
                <Button className="formButton" type="submit">
                    Sign Up
                </Button>
            </Form>

            <div className="helpInfo">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}
