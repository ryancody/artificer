import React, { Component } from 'react'
import Web3Info from './components/Web3Info'
import {web3, account} from './components/Web3Instance'
import ContractTools from './components/ContractTools'
import ArtifactInput from './components/ArtifactInput'
import util from 'util'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { read, readFile } from 'fs';

class App extends Component {

  constructor(props) {
    super(props)

    let tabs = [
      {
        name:'Upload',
        tab:<ArtifactInput handleFileChange={this.handleFileChange} />
      }
    ]

    this.state = {
      curTab:0,
      tabs:tabs,
      account:'',
      block:0
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

  handleFileChange = (e) => {
    let file = e.target.files[0]
    let fr = new FileReader()

    fr.onloadend = this.onLoadCallback
    fr.readAsText(file)
  }

  onLoadCallback = (e) => {

    this.updateTabs( JSON.parse(e.target.result) )
  }

  updateTabs = (contractData) => {
    let updatedTabs = this.state.tabs.concat([{ 
      name:contractData.contractName, 
      tab:<ContractTools 
          key={this.state.tabs.length} 
          contract={contractData}
        />  
    }])
    
    this.setState({
      tabs:updatedTabs
    })
  }

  setCurTab(i) {

    this.setState({
      curTab:i
    })
  }
    
  render() {
    let {tabs, curTab} = this.state
    let tabList = tabs.map((val, i) => {
      let className = ((i === curTab) ? 'is-active' : '')

      return(
        <li key={i} className={className} onClick={() => this.setCurTab(i)}><a>{val.name}</a></li>
      )
    })

    return (
      <div className='App'>
        <section className='hero is-dark'>
          <div className='hero-body'>
            <div className='container'>
              <h1 className='title'>
                Artificer
              </h1>
              <h2 className='subtitle'>
                interact with smart contracts <br />via Truffle artifacts
              </h2>
              
              <Web3Info
                onClick = { () => this.updateWeb3() }
                account = { this.state.account } 
                balance = { this.state.balance }
                block = { this.state.block }
              />
            </div>
          </div>
        </section>
        <div className='section'>
          <div className='container'>
            <div className='tabs'>
              <ul>
                {tabList}
              </ul>
            </div>
            <div className='container'>
              {tabs[curTab].tab}
            </div>
          </div>
        </div>
        <footer>

        </footer>
      </div>
    );
  }
}

export default App;
