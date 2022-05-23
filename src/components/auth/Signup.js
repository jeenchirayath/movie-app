import React, { useState, useContext } from 'react';
import { Form, Alert, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import AuthContext from "../context/Auth-Context";
import { Link, useHistory } from 'react-router-dom';
import './Login.scss';

const Signup = () => {
    const AuthCtx = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await AuthCtx.signup(email, password);
            history.push('/');
        } catch (err) {
            setError(err.message);
        }
    };
    return (

        <>
            <div className="p-4 box login">
                <h2 className="mb-3">Movie App Signup</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Sign up
                        </Button>
                    </div>
                </Form>
                <div className="p-4 box mt-3 text-center">
                    Already have an account? <Link to="/">Log In</Link>
                </div>
            </div>

        </>
    )
};

export default Signup;