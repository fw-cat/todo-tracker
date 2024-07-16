import React, { useState } from "react"
import { handlePreRegister } from "../../utils/auth"
import BaseLayout from "../../components/Layout/Base"

const RegisterPage = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const preRegister = async (event) => {
    event.preventDefault()
    await handlePreRegister(userName, email, password, passwordConfirmation)
  }

  return (
    <BaseLayout id="new_user">
      <main>
        <h1><img src="/images/new_user/titile_ribbon@2x.png" alt="新規ユーザ登録" /></h1>

        <form onSubmit={preRegister}>
          <div className="form-group">
            <label htmlFor="user_name">
              <i className="fa-solid fa-user"></i>
              ユーザ名
            </label>
            <div className="form-control">
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={userName}
                onChange={(e) => { setUserName(e.target.value) }}
                placeholder="ユーザー名" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <i className="fa-solid fa-envelope"></i>
              E-mail
            </label>
            <div className="form-control">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                placeholder="メールアドレス" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fa-solid fa-lock"></i>
              パスワード
            </label>
            <div className="form-control">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder="パスワード" />
              <span className="helper d-block">
                8～16文字の半角英数字記号でご記入ください
              </span>
            </div>
          </div>

          <div className="form-group no-label">
            <div className="form-control">
              <input
                type="password"
                name="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => { setPasswordConfirmation(e.target.value) }}
                placeholder="パスワード（確認用）" />
              <span className="helper d-block">
                ※確認のために、もう一度入力してください
              </span>
            </div>
          </div>

          <div className="form-submit">
            <button type="submit">
              <img src="/images/new_user/btn_register@2x.png" alt="登録" />
            </button>
          </div>
        </form>

        <div className="go_login">
          <a href="/user/login">
            すでに会員登録済みの方はこちら
            <i className="fa-solid fa-pen-to-square"></i>
          </a>
        </div>
      </main>
    </BaseLayout>
  )
}

export default RegisterPage

export const Head = () => <title>Register | Todo Tracker</title>
