import React, { Component } from 'react'
import {web3} from './Web3Instance'
import ContractFunction from './ContractFunction'

class ContractTools extends Component {

    constructor(props) {
        super(props)

        this.state = {
            address: 'address',
            name: 'name',
            contract: null,
            functions: null
        }
    }

    componentDidMount () {
        if(!this.state.contract) {
            console.log('no contract')

            this.setState({
                contract: this.props.contract,
                functions: this.SetupFunctions()
            })
        }
    }

    SetupFunctions() {
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
                <ContractFunction key={key++} 
                    name={i.name} 
                    inputs={i.inputs} 
                    mutability={i.stateMutability}
                    contract={this.state.contract}
                />
                )
            }
        })
        
        return functions
    }

    render () {
        
        if(this.state.contract) {
            console.log('contract',this.state.contract)
        }

        return(
            <div className = 'container'>
                {this.state.functions}
                <button className='button is-danger'>Remove Contract</button>
            </div>
        )
    }
}

export default ContractTools