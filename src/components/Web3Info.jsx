import React from 'react'
import {account, web3, isLoggedIn} from './Web3Instance'

let Web3Info = (props) => {
  let display
  
  if(!isLoggedIn){
    display = <div className='notification is-warning'>
      <strong>Need Web3!</strong>  Please log in to <a target='_blank' href='https://metamask.io/'>MetaMask</a>
    </div>
  } else {
    display = <div>
      <div className='title is-5'>Web3 Info</div>
      <div className='subtitle'>      
        <p><strong>Account</strong> {account.slice(0,6) + '...' + account.slice(account.length-6, account.length)}</p>
        <p><strong>ETH</strong> {props.balance}</p>
        <p><strong>Block</strong> {props.block}</p>
      </div>
    </div> 
  }

  return (

    <div className='web3info column' onClick={props.onClick}>
      {display}
    </div>
  )
}

export default Web3Info