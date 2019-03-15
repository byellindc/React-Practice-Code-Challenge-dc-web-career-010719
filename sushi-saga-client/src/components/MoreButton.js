import React from 'react'

const MoreButton = (props) => {
  return <button onClick={props.handleClick}>{props.label} sushi!</button>
}

export default MoreButton