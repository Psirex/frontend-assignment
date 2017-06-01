import React, { Component, PropTypes } from 'react'
import classes from './AssignmentView.scss'

import Board from '../Board'
import Pin from '../Pin'
import PinClass from '../../modules/PinClass'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const BOARD_WIDTH = 500
const BOARD_HEIGHT = 500
const ROWS_COUNT = 10
const COLUMNS_COUNT = 10
const PINS_COUNT = 4
const PIN_SIZE = 36

const WIN_MESSAGE = 'Correct!'
const LOSE_MESSAGE = 'Incorrect!'

const isExistPinWithCoords = (pins, row, column) =>
  pins.some(pin => pin.row === row && pin.column === column)

const getInitialState = (props) => {
  const { pinsCount, rowsCount, columnsCount } = props
  const pins = []
  let row, column
  for (let pinId = 0; pinId < pinsCount; ++pinId) {
    do {
      row = Math.round(Math.min(Math.random() * rowsCount, 9))
      column = Math.round(Math.min(Math.random() * columnsCount, 9))
    } while (isExistPinWithCoords(pins, row, column))
    pins.push(new PinClass(pinId, row, column))
  }
  return {pins, hoveredCell: null}
}

class AssingmentView extends Component {
  constructor (props) {
    super(props)
    this.state = getInitialState(props)
  }

  placePin = (pinId, position) => {
    this.setState((prevState) => {
      const { pins } = prevState
      const isBusy = pins.some(pin => {
        const pinPlace = pin.getPlaceCoords()
        if (!pinPlace) {
          return false
        }
        const {row, column} = pinPlace
        return row === position.row && column === position.column
      })
      const pinToPlace = pins.find(pin => pin.id === pinId)
      if (isBusy || ![pinToPlace]) {
        return {...prevState}
      }
      pinToPlace.place(position.row, position.column)
      return {...prevState}
    })
  }

  checkAnswer = () => {
    const { pins } = this.state
    const { winMessage, loseMessage } = this.props
    const correct = pins.every(pin => pin.placed[0] === pin.row && pin.placed[1] === pin.column)
    const message = correct ? winMessage : loseMessage
    alert(message)
  }

  getUnplacedPins = () => {
    const { pins } = this.state
    return pins.filter(pin => !pin.placed)
  }

  getPlacedPins = () => {
    const { pins } = this.state
    return pins.filter(pin => !!pin.placed)
  }

  render () {
    const placedPins = this.getPlacedPins()
    const unplacedPins = this.getUnplacedPins()
    const { pinSize, boardWidth, boardHeight, rowsCount, columnsCount } = this.props
    return (
      <div className={classes.assignmentWrapper}>
        <div className={classes.assignmentSidebar}>
          {
            unplacedPins
              .map((pin, index) =>
                <div key={index} className={classes.assignmentSidebarItem}>
                  <Pin
                    pin={pin}
                    width={pinSize}
                    height={pinSize}
                  />
                </div>
              )
          }
        </div>
        <div className={classes.assignmentContent}>
          <Board
            placePin={this.placePin}
            pinSize={pinSize}
            data={placedPins}
            width={boardWidth} height={boardHeight}
            rowsCount={rowsCount} columnsCount={columnsCount}
          />
          <button
            className={classes.checkButton}
            disabled={unplacedPins.length > 0}
            onClick={this.checkAnswer}
          >
            Check
          </button>
        </div>
      </div>
    )
  }
}

AssingmentView.propTypes = {
  boardWidth: PropTypes.number,
  boardHeight: PropTypes.number,
  rowsCount: PropTypes.number,
  columnsCount: PropTypes.number,
  pinSize: PropTypes.number,
  winMessage: PropTypes.string,
  loseMessage: PropTypes.string
}

AssingmentView.defaultProps = {
  boardWidth: BOARD_WIDTH,
  boardHeight: BOARD_HEIGHT,
  rowsCount: ROWS_COUNT,
  columnsCount: COLUMNS_COUNT,
  pinsCount: PINS_COUNT,
  pinSize: PIN_SIZE,
  winMessage: WIN_MESSAGE,
  loseMessage: LOSE_MESSAGE
}

export default DragDropContext(HTML5Backend)(AssingmentView)
