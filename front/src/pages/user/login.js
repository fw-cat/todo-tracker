import React, { useState } from "react"
import LoginLayout from "../../components/Layout/Login"
import formBtn from '../../images/login/login-btn.png'
import {handleLogin} from "../../utils/auth"

import "../../css/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    console.log(email, password)
    event.preventDefault()
    await handleLogin(email, password)
  }

  return (
    <LoginLayout>
      <div className="wrap">
        <main>
          <h1 className="fredericka-the-great-regular">HABIT TRACKER</h1>
          <form onSubmit={login}>
            <div className="form-group">
              <div className="input-icon">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="form-control">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon">
                <span className="material-symbols-outlined rotate-z90">key</span>
              </div>
              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-submit">
              <button type="submit">
                <img src={ formBtn } alt="LOGIN" />
              </button>
            </div>
          </form>
          <div id="register">
            <a href="/user/register/">新規登録<i className="fa-solid fa-pen-to-square"></i></a>
          </div>
        </main>
      </div>
      <div id="hydrangea"></div>
    </LoginLayout>
  )
}

export default LoginPage

export const Head = () => <title>Login | Todo Tracker</title>
