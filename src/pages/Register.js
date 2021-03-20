import React from 'react'
import axios from 'utilities/axios'
import useForm from 'react-hook-form'
import { toast } from 'react-toastify'

export default function Register(props) {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async data => {
    try {
      const { nickname, email, password } = data
      const res = await axios.post('/auth/register', {
        nickname,
        email,
        password,
        type: 0
      })
      const jwToken = res.data
      global.auth.setToken(jwToken)

      toast.success('註冊成功')
      props.history.push('/')
    } catch (error) {
      const message = error.response.data.message
      toast.error(message)
    }
  }

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">使用者名稱</label>
          <div className="control">
            <input
              className={`input ${errors.nickname && 'is-danger'}`}
              type="text"
              placeholder="使用者名稱"
              name="nickname"
              ref={register({
                required: '請填寫使用者名稱'
              })}
            />
            {errors.nickname && (
              <p className="helper has-text-danger">
                {errors.nickname.message}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">信箱</label>
          <div className="control">
            <input
              className={`input ${errors.email && 'is-danger'}`}
              type="text"
              placeholder="Email"
              name="email"
              ref={register({
                required: '請填寫信箱',
                pattern: {
                  value: /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                  message: 'invalid email'
                }
              })}
            />
            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">密碼</label>
          <div className="control">
            <input
              className={`input ${errors.password && 'is-danger'}`}
              type="password"
              placeholder="Password"
              name="password"
              ref={register({
                required: '請填寫密碼',
                minLength: {
                  value: 6,
                  message: '密碼長度不得小於六個字元'
                }
              })}
            />
            {errors.password && (
              <p className="helper has-text-danger">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">註冊</button>
        </div>
      </form>
    </div>
  )
}
