import React, { Component, PropTypes } from 'react'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from '../../modules/draggableItemTypes'

import Rectangle from '../Ractangle'


const squareTarget = {
  drop (props, monitor) {
    const { placePin, row, column } = props
    const {id: pinId} = monitor.getItem()
    placePin(pinId, {row, column})
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class BoardRectangle extends Component {

  componentWillReceiveProps (nextProps) {
    const { onPinHover, onPinLeave, isOver: prevIsOver, row, column } = this.props
    const { isOver: nextIsOver } = nextProps
    if (!prevIsOver && nextIsOver) {
      onPinHover({row, column})
    } else if (prevIsOver && !nextIsOver) {
      onPinLeave({row, column})
    }
  }

  render () {
    const { children, width, height, connectDropTarget } = this.props
    return connectDropTarget(
      <div>
        <Rectangle width={width} height={height}>
          {children}
        </Rectangle>
      </div>
    )
  }
}

BoardRectangle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  children: PropTypes.node,
  onPinHover: PropTypes.func.isRequired,
  onPinLeave: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  connectDropTarget: PropTypes.func
}

export default DropTarget(ItemTypes.PIN, squareTarget, collect)(BoardRectangle)
