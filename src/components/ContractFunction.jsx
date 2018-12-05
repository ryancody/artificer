import React, { Component } from 'react'
import Input from './Input'
import {account} from './Web3Instance'
import Response from './Response.js'
import Interact from './Interact'

class ContractFunction extends Component {

    constructor(props){
        super(props)

        this.state = {
            params: {},
            response: new Response()
        }
        
        this.submitValue = this.submitValue.bind(this)
    }

    submitValue(val, key){
        let o = {}

        o[key] = val
        this.setState({
            params: Object.assign({}, this.state.params, o)
        })
    }
    
    async submit () {
        
        // instantiate response r
        let r = new Response()

        r.setPending()

        this.setState({
            response: r
        })

        // call stuff
        let i = new Interact(this.state.params, this.props.contract, this.props.name, this.props.mutability)
        i = await i.go()
        r.update(i)

        this.setState({
            response: r
        })
    }

    render() {
        let inputs
        let key = 0

        if(this.props.inputs){
            inputs = this.props.inputs.map((i) =>{
                key++
                return(
                    <Input key={key} 
                        id={key}
                        label={i.type} 
                        description={i.name} 
                        submitValue={this.submitValue}
                    />
                )
            })
        }

        return (
            <div className="contract-function">
                <div className="function-box">                
                    <div className="function-name">
                        {this.props.name} - {this.props.mutability}
                    </div>
                    {inputs}
                    <button onClick={() => this.submit()}>go</button>
                </div>
                {this.state.response.div()}
            </div>
        )
    }
}

export default ContractFunction