import React, {Component} from 'react'

class ArtifactInput extends Component {

    constructor (props) {
        super (props)

        this.state = {
            file:null
        }
    }

    render () {
        let {file} = this.state

        let fileName = ''
        if(file){
            fileName = file.name
        }

        return (
            <div className='file has-name is-boxed'>
                <label className='file-label'  onChange={(e) => this.props.handleFileChange(e)}>
                    <input className='file-input' type='file' name='artifact' accept='.json' />
                    <span className='file-cta'>
                        <span className='file-icon'>
                            <i className='fas fa-upload'></i>
                        </span>
                        <span className='file-label'>
                            Choose a file…
                        </span>
                    </span>
                </label>
            </div>
        )
    }
}

export default ArtifactInput