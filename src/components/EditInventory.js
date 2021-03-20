import React from 'react'
import { toast } from 'react-toastify'
import axios from 'utilities/axios'

class EditInventory extends React.Component {
  state = {
    id: '',
    name: '',
    price: '',
    tags: '',
    image: '',
    status: 'available'
  }

  componentDidMount() {
    const { id, name, image, tags, price, status } = this.props.product;
    this.setState({
      id,
      name,
      image,
      tags,
      price,
      status
    })
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    })
  }

  submit = e => {
    e.preventDefault();
    const product = { ...this.state };
    axios.put(`products/${this.state.id}`, product).then(res => {
      this.props.close(res.data);
      toast.success('Edit Success');
    })
  }

  onDelete = () => {
    axios.delete(`products/${this.state.id}`).then(res => {
      this.props.deleteProduct(this.state.id)
      this.props.close()
      toast.success('Edit Success')
    })
  }

  render() {
    return (
      <div className="inventory">
        <p className="title has-text-centered">商品更新</p>
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
              <label className="label">價格</label>
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
              <label className="label">庫存</label>
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
              <button className="button is-link">送出更新</button>
            </div>
            <div className="control">
              <button
                className="button is-danger"
                type="button"
                onClick={this.onDelete}
              >
                刪除商品
              </button>
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
    );
  }
}

export default EditInventory
