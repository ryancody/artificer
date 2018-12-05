import React from 'react'
import {account} from './Web3Instance'

let Web3Info = (props) => {
    
  return (
    <div className='web3info container' onClick={props.onClick}>
      <div className='title is-5'>Web3 Info</div>
      <div>Account: {account.slice(0,6) + '...' + account.slice(account.length-6, account.length)}</div>
      <div>ETH Balance: {props.balance}</div>
      <div>Block: {props.block}</div>
    </div>
  )
}

export default Web3Info