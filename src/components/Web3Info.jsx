import React from 'react'
import {account} from './Web3Instance'

let Web3Info = (props) => {
    
  return (
    <div className='web3info container' onClick={props.onClick}>
      <h2>Web3 Info</h2>
      <h3>Account: {account.slice(0,6) + '...' + account.slice(account.length-6, account.length)}</h3>
      <h3>ETH Balance: {props.balance}</h3>
      <h3>Block: {props.block}</h3>
    </div>
  )
}

export default Web3Info