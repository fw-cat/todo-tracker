import React, { useState } from "react"
import BaseLayout from "../../components/Layout/Base"
import {
  Form, Button
} from 'react-bootstrap'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <BaseLayout>
      <h1>Login Page</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </BaseLayout>
  )
}

export default LoginPage

export const Head = () => <title>Login | Todo Tracker</title>
