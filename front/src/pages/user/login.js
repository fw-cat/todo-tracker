import React, { useState } from "react"
import LoginLayout from "../../components/Layout/Login"
import { handleLogin } from "../../utils/auth"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()
    await handleLogin(email, password)
  }

  return (
    <LoginLayout id="login">
      <div class="wrap">
        <main>
          <h1>HABIT TRACKER</h1>
          <div class="main-form">
            <form onSubmit={login}>
              <div class="form-background">
                <img src="/images/login/from.png" />
              </div>
              <div class="form-group">
                <div class="input-icon">
                  <label htmlFor="email">
                    <span class="d-block">person</span>
                  </label>
                </div>
                <div class="form-control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    className={`${email !== '' ? 'is-input' : ''}`}
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="input-icon">
                  <label htmlFor="password">
                    <span class="d-block rotate-z90">key</span>
                  </label>
                </div>
                <div class="form-control">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="パスワード"
                    className={`${password !== '' ? 'is-input' : ''}`}
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                  />
                </div>
              </div>

              <div class="form-submit">
                <button type="submit">
                  <img src="/images/login/login-btn.png" />
                </button>
              </div>
            </form>

          </div>
          <div id="register">
            <a href="/new_user.html" class="btn mi-auto">新規登録<i class="fa-solid fa-pen-to-square"></i></a>
          </div>
        </main>
      </div>
    </LoginLayout>
  )
}

export default LoginPage

export const Head = () => <title>Login | Todo Tracker</title>
