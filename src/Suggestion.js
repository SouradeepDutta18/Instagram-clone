import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import "./Suggestion.css"

function Suggestion(props) {
    return (
        <div className="Suggestion">
        <Avatar alt="Remy Sharp" src={props.sugguserimage}/>
        <div className="metatext">
          <h5>{props.sugguser}</h5>
          <p>{props.sugg_metatext}</p>
        </div>
        </div>
    )
}

export default Suggestion
