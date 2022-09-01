import react, { FormEvent, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated, loginUser, setToken } from "./authFunc";

export function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate()

    function loginHandler(e: FormEvent) {
        e.preventDefault()
        loginUser(username, password)
            .then((data: any) => {
                setToken(data.data.data.login)
                setIsError(false)
                navigate("/")
            })
            .catch(e => {
                setIsError(true)
            })
    }
  
    return (
        isAuthenticated() ? <Navigate to="/" /> :
        <form className="login-form" onSubmit={(e) => loginHandler(e)}>
            <Row>
                <Col className="col-3 offset-4">
                    {process.env['NODE_ENV']}
                    {
                    isError && 
                    <Alert variant="danger">
                        Email or password is wrong!
                    </Alert>
                    }
                    <h2>Login</h2>
                    <label>Email</label>
                    <p><input type="text" autoFocus className="form-control" value={ username } onChange={(e) => setUsername(e.target.value)} /></p>
                    <label>Password</label>
                    <p><input type="password" className="form-control" value={ password } onChange={(e) => setPassword(e.target.value)} /></p>
                    <p><Button type="submit">Login</Button></p>
                </Col>
            </Row>
        </form>
    );
}