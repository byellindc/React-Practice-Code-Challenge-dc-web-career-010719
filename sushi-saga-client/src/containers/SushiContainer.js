import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        <MoreButton label='Less' handleClick={props.goBackward} />
        {props.sushis.map(s => {
          return <Sushi key={s.id} sushi={s} onSelect={props.onSelect} />
        })}
        <MoreButton label='More' handleClick={props.goForward} />
      </div>
    </Fragment>
  )
}

export default SushiContainer