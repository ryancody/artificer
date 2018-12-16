import Web3 from 'web3'

export let web3 = new Web3(window.web3.currentProvider || "http://localhost:8545")
export let account = '0x0000000000000000000000000000000000000000'
export let isLoggedIn = false

console.log('using web3 verison', web3.version)

async function GetDefaultAccount() {
  let accounts = await web3.eth.getAccounts()

  if(accounts){
    account = accounts[0]
    console.log('default account is now', account)
  }
}

GetDefaultAccount()

async function checkLogIn(){
  web3.eth.getAccounts(function(err, accounts){
    if (err != null) {
      console.error('error', err)
      isLoggedIn = false
    } else if (accounts.length == 0){
      console.log("User is not logged in to MetaMask")
      isLoggedIn = false
    } else {
      console.log("User is logged in to MetaMask")
      isLoggedIn = true
    }
  })
}

checkLogIn()