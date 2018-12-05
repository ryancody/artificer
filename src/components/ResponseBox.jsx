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
            responseState = 'success'
        }else{
            responseState = 'error'
        }

        if(this.state.response.pending) {
            responseState = 'pending'
        }

        return(
            <div className='response-box'>
                <div className={`response ${responseState}`}>
                    <span className='header'>{`${this.state.response.header}`}</span> {JSON.stringify(this.state.response.message)}
                </div>
                <div className='close' onClick={() => this.close()}>
                    🗙
                </div>
            </div>
        )
    }
}

export default ResponseBox