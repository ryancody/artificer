import React, { Component } from 'react';

class ToolSwitch extends Component {
  
    render () {
        let selected
        if(this.props.selected){
            selected = ' selected'
        }else {
            selected = '';
        }
        return(
            <p className={`tool-switch-button${selected}`}>
                <span onClick = { this.props.onClick } > { this.props.label } </span>
            </p>
        )
    }
}

export default ToolSwitch