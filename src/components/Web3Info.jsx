import React from 'react'
import {account} from './Web3Instance'

let Web3Info = (props) => {
    
  return (
    <div className='web3info container' onClick={props.onClick}>
      <div className='title is-5'>Web3 Info</div>
      <div className='subtitle'>      
        <p><strong>Account</strong> {account.slice(0,6) + '...' + account.slice(account.length-6, account.length)}</p>
        <p><strong>ETH</strong> {props.balance}</p>
        <p><strong>Block</strong> {props.block}</p>
      </div>
    </div>
  )
}

export default Web3Info