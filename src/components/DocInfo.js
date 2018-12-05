import React from 'react'

export const notDoc = "0xa3f1c8792abf4061e1E4683a3a1728536FC6bBd4"
export const isDoc =  "0x54467AB2Bb7DC02C41cB41d0f1C9422C12437be9"

let DocInfo = (props) => {
    
    return (
      <div>
        <h3>Sample Doctor Info</h3>
        <p><b>not a doc : </b>{notDoc}</p>
        <p><b>is a doc : </b>{isDoc}</p>
      </div>
    )
}

export default DocInfo