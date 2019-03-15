import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor() {
    super()
    this.state = {
      sushis: [],
      purchases: [],
      index: 0,
      balance: 100
    }
  }

  componentDidMount() {
    this.loadSushi()
  }

  loadSushi() {
    fetch(`http://localhost:3000/sushis`)
      .then(res => res.json())
      .then(sushis => this.processSushi(sushis))
  }

  processSushi(sushiObjs) {
    // add eaten attribute to sushi objects
    const sushis = sushiObjs.map(sushi => {
      sushi.eaten = false
      return sushi
    })
    this.setState({sushis: sushis})
  }

  sushiPage() {
    return this.state.sushis.slice(this.state.index, this.state.index + App.limit)
  }

  goForward = () => {
    let newIndex = this.state.index + App.limit
    if (newIndex >= this.state.sushis.length) newIndex = 0
    this.setState({index: newIndex})
  }

  goBackward = () => {
    let newIndex = this.state.index - App.limit
    if (newIndex <= 0) newIndex = this.state.sushis.length - App.limit
    this.setState({index: newIndex})
  }

  eatenSushi() {
    return this.state.sushis.filter(s => s.eaten)
  }

  onSelect = (sushi) => {
    this.eatSushi(sushi)
  }

  handleClick = () => {
    this.goForward()
  }

  eatSushi(sushi) {
    if (sushi.eaten) return

    const newPurchases = this.state.purchases.slice()

    const newSushis = this.state.sushis.map(s => {
      if (s.id === sushi.id) {
        newPurchases.push(s.price)
        s.eaten = true
      }
      return s
    })

    // const totalSpent = newPurchases.reduce((total, p) => total + p, 0)
    const newBalance = this.state.balance - sushi.price
    if (newBalance < 0 ) return false

    this.setState({
      sushis: newSushis,
      purchases: newPurchases,
      balance: newBalance
    })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          onSelect={this.onSelect} 
          goForward={this.goForward}
          goBackward={this.goBackward}
          sushis={this.sushiPage()} />
        <Table purchases={this.state.purchases} balance={this.state.balance} />
      </div>
    );
  }
}

App.limit = 4

export default App;