import React from 'react'

export default function UserProfile(props) {
  const logout = () => {
    global.auth.logout()
    props.close('logout')
  }

  return (
    <div className="user-profile">
      <p className="title has-text-centered">個人檔案</p>
      <fieldset disabled>
        <div className="field">
          <div className="control">
            <label className="label">使用者名稱</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.nickname}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">信箱</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.email}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">會員權限</label>
            <input
              className="input"
              type="text"
              defaultValue={props.user.type === 1 ? '管理員' : '一般會員'}
            />
          </div>
        </div>
      </fieldset>

      <br />
      <br />
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-danger" type="button" onClick={logout}>
            登出
          </button>
        </div>
        <div className="control">
        </div>
      </div>
    </div>
  )
}
