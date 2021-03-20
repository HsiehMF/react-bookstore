import React from 'react'
import axios from 'utilities/axios'
import useForm from 'react-hook-form'
import { toast } from 'react-toastify'

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async data => {
    try {
      const { email, password } = data;
      const res = await axios.post('/auth/login', { email, password })
      const jwToken = res.data
      console.log(jwToken)
      global.auth.setToken(jwToken)
      toast.success('登入成功')

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
          <label className="label">信箱</label>
          <div className="control">
            <input
              className={`input ${errors.email && 'is-danger'}`}
              type="text"
              placeholder="Email"
              name="email"
              ref={register({
                required: 'email is required',
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
                required: 'password is required',
                minLength: {
                  value: 6,
                  message: 'cannot be less than 6 digits'
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
          <button className="button is-fullwidth is-primary">登入</button>
        </div>
      </form>
    </div>
  )
}
