import React, { Component } from 'react'
import {web3} from './Web3Instance'
import GetContractData from './GetContractData'
import ContractFunction from './ContractFunction'

class ContractTools extends Component {

    constructor(props) {
        super(props)

        this.state = {
            address: "address",
            name: "name",
            contractData: null,
            contract: null,
            functions: null
        }

        this.Setup()
    }

    async Setup(){

        try{
            let contractData = await this.SetupContract(this.props.contract)
            this.SetupFunctions(contractData)
        }catch(e){
            console.log('failed to set up contract data', e)
        }
    }

    async SetupContract(name) {
        let contractData = GetContractData(name)
        let contract = await new web3.eth.Contract(contractData.abi)
        let networkID = await web3.eth.net.getId()

        contract.options.address = contractData.networks[networkID].address

        this.setState({
            contractData: contractData,
            contract: contract
        })

        return contractData
    }

    SetupFunctions(contractData) {
        let functions = ''
        
        let key = 0
        functions = contractData.abi.map((i) => {
            if(!i.name || i.name === ''){
                console.log('skipping private function')
                return null
            } else if (!i.stateMutability) {
                console.log('skipping event')
                return null
            }else {
                return(
                <ContractFunction key={key++} 
                    name={i.name} 
                    inputs={i.inputs} 
                    mutability={i.stateMutability}
                    contract={this.state.contract}
                />
                )
            }
        })
        this.setState({functions:functions})
    }

    render () {
        return(
            <div className = "contract-tools">
                {this.state.functions}
            </div>
        )
    }
}

export default ContractTools