import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Panel from 'components/Panel'
import UserProfile from 'components/UserProfile'
import AddInventory from 'components/AddInventory'

const Header = props => {
  const toAdd = () => {
    Panel.open({
      component: AddInventory,
      callback: data => {
        if (data) {
          this.add(data);
        }
      }
    })
  }

  const toProfile = () => {
    Panel.open({
      component: UserProfile,
      props: {
        user: props.user
      },
      callback: data => {
        if (data === 'logout') {
          props.history.go(0)
        }
      }
    })
  }
  return (
    <div className="header">
      <div className="grid">
        <div className="start">
          <Link to="/">首頁</Link>
        </div>
        <div className="end">
          {props.user.nickname ? (
            <div>
              <span className="nickname" onClick={toProfile}>
                <i className="far fa-user"></i>
                {props.user.nickname}
              </span>
              <span className="addItem" onClick={toAdd}>
              <i class="fas fa-plus"></i>
              新增商品
            </span>
          </div>
          ) : (
            <React.Fragment>
              <Link to="/login">登入</Link>
              <Link to="/register">註冊會員</Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header)
