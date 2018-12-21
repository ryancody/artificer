import React, { Component } from 'react'
import {web3} from './Web3Instance'
import ContractFunction from './ContractFunction'

class ContractTools extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            address: 'address',
            name: 'name',
            contract: null,
            functions: null
        }
    }

    componentDidMount () {
        this.Setup()
    }

    async Setup() {
        await this.GetDeployedContract()
        await this.SetupFunctions()
    }

    async GetDeployedContract () {
        let contract = await new web3.eth.Contract(this.props.contract.abi)
        let networkID = await web3.eth.net.getId()

        contract.options.address = this.props.contract.networks[networkID].address
        
        this.setState({contract:contract})
    }

    async SetupFunctions () {
        let functions = ''
        let key = 0
        
        functions = this.props.contract.abi.map((i) => {
            if(!i.name || i.name === ''){
                console.log('skipping private function')
                return null
            } else if (!i.stateMutability) {
                console.log('skipping event')
                return null
            }else {
                return(
                <ContractFunction key={ key++ } 
                    name={ i.name } 
                    inputs={ i.inputs } 
                    mutability={ i.stateMutability }
                    contract= { this.state.contract }
                />
                )
            }
        })
        
        this.setState({functions:functions})
    }

    render () {
        
        return(
            <div className = 'container'>
                {this.state.functions}
                {/*<button className='button is-danger' onClick={() => this.props.handleRemove(this.state.id)}>Remove Contract</button>*/}
            </div>
        )
    }
}

export default ContractTools