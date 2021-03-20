import React from 'react'
import axios from 'utilities/axios'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ToolBox from 'components/ToolBox'
import Product from 'components/Product'


class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: []
  }

  componentDidMount() {
    axios.get('/products').then(response => {
      this.setState({
        products: response.data,
        sourceProducts: response.data
      })
    })
  }

  // 搜尋功能
  search = text => {
    // 1. Get New Array
    let _products = [...this.state.sourceProducts]

    // 2. Filter New Array
    _products = _products.filter(p => {
      // name: Abcd text: ab   ===> ['Ab']
      // text: '' ==> ["", "", "", "", ""]
      const matchArray = p.name.match(new RegExp(text, 'gi'))
      return !!matchArray
    });

    // 3. set State
    this.setState({
      products: _products
    })
  }

  add = product => {
    const _products = [...this.state.products]
    _products.push(product)
    const _sProducts = [...this.state.sourceProducts]
    _sProducts.push(product)

    this.setState({
      products: _products,
      sourceProducts: _sProducts
    })
  }

  update = product => {
    const _products = [...this.state.products]
    const _index = _products.findIndex(p => p.id === product.id)
    _products.splice(_index, 1, product)
    const _sProducts = [...this.state.sourceProducts]
    const _sIndex = _products.findIndex(p => p.id === product.id)
    _sProducts.splice(_sIndex, 1, product)
    this.setState({
      products: _products,
      sourceProducts: _sProducts
    })
  }

  delete = id => {
    const _products = this.state.products.filter(p => p.id !== id)
    const _sProducts = this.state.sourceProducts.filter(p => p.id !== id)
    this.setState({
      products: _products,
      sourceProducts: _sProducts
    })
  }

  render() {
    // const user = global.auth.getUser()
    return (
      <div>
        <ToolBox search={this.search} />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {this.state.products.map(p => {
                return (
                  <CSSTransition
                    classNames="product-fade"
                    timeout={300}
                    key={p.id}
                  >
                    <div className="column is-3" key={p.id}>
                      <Product
                        product={p}
                        update={this.update}
                        delete={this.delete}
                      />
                    </div>
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default Products
