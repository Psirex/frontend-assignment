import React, { Component, PropTypes } from 'react'
import classes from './Pin.scss'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../../modules/draggableItemTypes'


const pinSource = {
  beginDrag (props) {
    const { id } = props.pin
    return { id }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Pin extends Component {
  render () {
    const {pin, width, height, connectDragSource} = this.props
    return connectDragSource(
      <div style={{width, height}} className={`${classes.pinWrapper}`}>
        {pin.getText()}
      </div>
    )
  }
}

Pin.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  pin: PropTypes.object,
  isDragging: PropTypes.bool
}

export default DragSource(ItemTypes.PIN, pinSource, collect)(Pin)
