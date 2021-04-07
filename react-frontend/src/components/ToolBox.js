import React from 'react'
import { withRouter } from 'react-router-dom'
class ToolBox extends React.Component {
  state = {
    searchText: ''
  }

  handleChange = e => {
    const value = e.target.value
    this.setState({
      searchText: value
    })
    this.props.search(value)
  }

  clearSearchText = () => {
    this.setState({
      searchText: ''
    })
    this.props.search('');
  }

  render() {
    return (
      <div className="tool-box">
        <div className="logo-text">React BookStore</div>
        <div className="search-box">
          <div className="field has-addons">
            <div className="control">
              <input
                type="text"
                className="input search-input"
                placeholder="搜尋商品名稱"
                value={this.state.searchText}
                onChange={this.handleChange}
              />
            </div>
            <div className="control">
              <button className="button" onClick={this.clearSearchText}>
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ToolBox)
