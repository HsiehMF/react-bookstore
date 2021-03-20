import React from 'react'
import { toast } from 'react-toastify'
import axios from 'utilities/axios'

class AddInventory extends React.Component {
  state = {
    name: '',
    price: '',
    tags: '',
    image: '',
    status: 'available'
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    })
  }

  submit = e => {
    e.preventDefault()
    const product = { ...this.state }
    axios.post('products', product).then(res => {
      this.props.close(res.data)
      toast.success('新增成功')
    })
  }

  render() {
    return (
      <div className="inventory">
        <p className="title has-text-centered">新增商品</p>
        <form onSubmit={this.submit}>
          <div className="field">
            <div className="control">
              <label className="label">書籍名稱</label>
              <textarea
                className="textarea"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">價錢</label>
              <input
                type="number"
                className="input"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">標籤</label>
              <input
                type="text"
                className="input"
                name="tags"
                value={this.state.tags}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">圖片</label>
              <input
                type="text"
                className="input"
                name="image"
                value={this.state.image}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">庫存狀況</label>
              <div className="select is-fullwidth">
                <select
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  <option>現貨</option>
                  <option>缺貨</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">送出</button>
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={() => {
                  this.props.close();
                }}
              >
                取消
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AddInventory;
