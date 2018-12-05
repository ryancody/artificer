import React, { Component } from 'react';
import './App.css';
import Web3Info from './components/Web3Info'
import {web3, account} from './components/Web3Instance'
import ToolSwitch from './components/ToolSwitch';
import ContractTools from './components/ContractTools';

class App extends Component {

  constructor(props) {
    super(props)

    let tools = [
      {
        "id":1,
        "label":"policy manager",
        "block":<ContractTools key={1} contract="PolicyManager" />
      }
    ]

    this.state = {
      account:'',
      block:0,
      tools:tools,
      curTool: ''
    }

    
    this.updateWeb3()
  }

  async updateWeb3 () {
    let block
    let balance

    try{
      block = await web3.eth.getBlockNumber()
      balance = await web3.eth.getBalance(account) * Math.pow(10, -18)
      
      this.setState({
        account: account,
        block: block,
        balance: balance
      })
    }catch(e){
      console.log('need metamask!')
    }
  }

  handleToolOption(option) {
    this.setState( Object.assign( {}, this.state, { curTool: option } ) )
  }
    
  render() {

    let toolbar = this.state.tools.map((val) => {
      return <ToolSwitch
                selected={ (val === this.state.curTool) ? true : false }
                key = { val.id }
                label = { val.label } 
                onClick = { () => this.handleToolOption(val) }
              />
    })

    return (
      <div className="App">
        <header className="App-header">
          <Web3Info 
            onClick = { () => this.updateWeb3() }
            account = { this.state.account } 
            balance = { this.state.balance }
            block = { this.state.block }
          />
        </header>
        <div>
          <div className="toolbar">
            { toolbar }
          </div>
            { this.state.curTool.block }
        </div>
        <footer>

        </footer>
      </div>
    );
  }
}

export default App;
