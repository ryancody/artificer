import {account} from './Web3Instance'
import Response from './Response'

// takes contract data and calls function by name
// returns a Response

export default function Interact (params, contract, functionName, mutability) {
    
    this.params = params
    this.contract = contract
    this.function = this.contract.methods[functionName]
    
    this.convertParams = () => {
        let p = []

        // get parameters for the function as an array
        for (var key in this.params) {
            if (this.params.hasOwnProperty(key)) {
                p.push(this.params[key])
            }
        }
        this.params = p
    }
    
    this.convertParams()

    this.go = async () => {
        let response = new Response()
        response.update({
            show: true,
            pending: false
        })

        // not mined
        try{

            let message
            if(mutability === 'view'){
                // not mined
                message = await this.function.apply(this, this.params).call({from:account})
            }else {
                // mined
                message = await this.function.apply(this, this.params).send({from:account})
            }

            console.log(message)

            response.update({
                message: message,
                success: true,
                header: 'Success'
            })

        }catch(e){

            response.update({
                message: e.toString(),
                success: false,
                header: 'Failure'
            })
        }

        console.log(response)
        return response
    }
}