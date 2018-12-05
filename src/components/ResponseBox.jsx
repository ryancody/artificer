import React, { Component } from 'react';

class ResponseBox extends Component {
    constructor(props){
        super(props)

        this.state = {
            response: props.response
        }
    }

    close() {
        this.state.response.close()
        this.setState({response: this.state.response})
    }

    render() {

        if(!this.state.response.show){
            return null
        }

        let responseState = ''

        if(this.state.response.success){
            responseState = 'is-success'
        }else{
            responseState = 'is-warning'
        }

        if(this.state.response.pending) {
            responseState = 'is-info'
        }

        return(
            <div className={`notification ${responseState}`}>
                <button className='delete' onClick={() => this.close()}></button>
                <strong>{`${this.state.response.header}`}</strong> {JSON.stringify(this.state.response.message)}
            </div>
        )
    }
}

export default ResponseBox