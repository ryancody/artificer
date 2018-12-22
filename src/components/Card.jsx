import React, { Component } from 'react'

class Card extends Component {

    constructor(props){
        super(props)

        this.state = {
        }
        
    }

    render () {
        return (
            <div className='card'>
                <header className='card-header'>
                    <p className='card-header-title'>
                        {this.props.name}
                    </p>
                </header>
                <div className='card-content'>
                    <div className='content'>
                        put details here
                    </div>
                </div>
                <footer className='card-footer'>
                    <a href='#' className='card-footer-item'>Remove</a>
                </footer>
            </div>
        )
    }
}

export default Card