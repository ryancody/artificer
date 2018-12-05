import Web3 from 'web3'

export let web3 = Web3Instance()
export let account = '0x00000000000000'

function Web3Instance () {

  let w = new Web3(window.web3 || "http://localhost:8545")

  return w
}

async function GetDefaultAccount() {
  console.log('getting default acct')
  account = await web3.eth.getAccounts()
  account = account[0]
  console.log('default account is now', account)
}

GetDefaultAccount()