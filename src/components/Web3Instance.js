import Web3 from 'web3'

export let web3 = new Web3(window.web3.currentProvider || "http://localhost:8545")
export let account = null

console.log('using web3 version', web3.version)

export async function GetDefaultAccount() {
  if(account) {
    return account
  }

  account = await web3.eth.getAccounts()
  console.log('returned',account)
  account = account[0]
  console.log('default account is now', account)
  return account
}

window.addEventListener('load', async () => {

  if(window.ethereum) {
    
    window.web3 = new Web3(window.web3.currentProvider);
    try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed

        await GetDefaultAccount()
    } catch (error) {
        // User denied account access...
        console.error(error)
    }
  }
})