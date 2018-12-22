import React, { Component } from 'react'
import Web3Info from './components/Web3Info'
import {web3, account} from './components/Web3Instance'
import ContractTools from './components/ContractTools'
import ArtifactInput from './components/ArtifactInput'
import Card from './components/Card'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'

class App extends Component {

  constructor(props) {
    super(props)

    let tabs = [
      {
        name:'Upload',
        tab:<div className='tile is-3'>
          <ArtifactInput handleFileChange={this.handleFileChange} />
        </div>
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

  // TODO: move this to web3info component!
  // web3info needs to be its own widget
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
    let updatedTabs = this.state.tabs.concat([
      { 
        name:contractData.contractName, 
        tab:<ContractTools 
            key={this.state.tabs.length}
            id={this.state.tabs.length}
            contract={contractData}
            handleRemove={this.handleRemove}
          />  
      }
    ])
    
    this.setState({
      tabs:updatedTabs
    })
  }

  setCurTab(i) {

    this.setState({
      curTab:i
    })
  }

  handleRemove = (i) => {

    // remove a tab by setting the tabs state to be 
    // a version of the tabs state filtered for the tab's id
    this.setState(
      {
        curTab: 0,
        tabs: this.state.tabs.filter( tab => tab.id === i )
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

    let cards = tabs.map((val, i) => {
      if(i > 0 && this.state.curTab === 0){
        return(
          <div key={i} className='tile is-3'>
            <Card name={val.name} />
          </div>
        )
      }
    })

    return (
      <div className='App'>
        <section className='hero is-dark'>
          <div className='hero-body'>
            <div className='container'>
              <div className='columns'>
                <div className='column is-half'>
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
                <div className='column is-half'>
                  <div className='level'>
                    <p className='level-left'><strong>Dont have any artifacts?</strong></p>
                    <p>Use this sample file and connect to Ropsten</p>
                    <a href={'./assets/Demo.json'} download>
                      <button className='button is-info level-right'>Demo.json</button>
                    </a>
                  </div>
                </div>
              </div>
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
              <div className='tile is-ancestor'>
                {tabs[curTab].tab}
                {cards}
              </div>
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
