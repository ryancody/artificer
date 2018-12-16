import React from 'react'
import {account, web3, isLoggedIn} from './Web3Instance'

let Web3Info = (props) => {
  let web3warning
  
  if(!isLoggedIn){
    web3warning = <div className='notification is-warning'>
      <strong>Need Web3!</strong>  Please log in to MetaMask
    </div>
  }

  return (

    <div className='web3info container' onClick={props.onClick}>
      <div className='columns'>
        <div className='column is-half'>
          <div className='title is-5'>Web3 Info</div>
          <div className='subtitle'>      
            <p><strong>Account</strong> {account.slice(0,6) + '...' + account.slice(account.length-6, account.length)}</p>
            <p><strong>ETH</strong> {props.balance}</p>
            <p><strong>Block</strong> {props.block}</p>
          </div>
        </div>
        <div className='column is-one-third'>
          {web3warning}
        </div>
      </div>

    </div>
  )
}

export default Web3Info