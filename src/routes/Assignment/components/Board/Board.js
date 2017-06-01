import React, { Component, PropTypes } from 'react'
import classes from './Board.scss'

import BoardRectangle from '../BoardRectangle'
import Pin from '../Pin'
import Grid from '../Grid'

const HOVERED_GRID_POINT_RADIUS = 12
const EMPTY_GRID_POINT_RADIUS = 6
const FILL_GRID_POINT_RADIUS = 21

class Board extends Component {

  constructor (props) {
    super(props)
    this.state = {
      hoveredCell: {}
    }
  }

  getSquareSize = () => {
    const { width, height, rowsCount } = this.props
    const rectWidth = Math.round(width / rowsCount)
    const rectHeight = Math.round(height / rowsCount)
    return {width: rectWidth, height: rectHeight}
  }

  getPin = (row, column) => {
    const { data, pinSize } = this.props
    const pinData = data.find(pin => pin.placed[0] === row && pin.placed[1] === column)
    return pinData && <Pin pin={pinData} width={pinSize} height={pinSize} />
  }

  getBlockSquare = (row, column) => {
    const { placePin } = this.props
    const rectSize = this.getSquareSize()
    return (
      <BoardRectangle
        key={column}
        row={row}
        column={column}
        width={rectSize.width}
        height={rectSize.height}
        size={this.getSquareSize()}
        onPinLeave={this.onBoardSquarePinLeave}
        onPinHover={this.onBoardSquarePinHover}
        placePin={placePin}
      >
        {this.getPin(row, column)}
      </BoardRectangle>
    )
  }

  getRow = (row) => {
    const { columnsCount } = this.props
    const squares = []
    for (let column = 0; column < columnsCount; ++column) {
      squares.push(this.getBlockSquare(row, column))
    }
    return (
      <div key={row} className={classes.boardRow}>
        {squares}
      </div>
    )
  }

  onBoardSquarePinHover = (cell) => {
    this.setState({hoveredCell: cell})
  }

  onBoardSquarePinLeave = ({row, column}) => {
    this.setState((prevState) => {
      const { hoveredCell } = prevState
      if (hoveredCell.row === row && hoveredCell.column === column) {
        return {...prevState, hoveredCell: {}}
      }
    })
  }

  getLinePoints = () => {
    const { rowsCount, columnsCount } = this.props
    const { width: rectWidth, height: rectHeight } = this.getSquareSize()
    const heightShift = rectHeight / 2
    const widthShift = rectWidth / 2
    const horizontalLines = []
    for (let rowIndex = 0; rowIndex < rowsCount; ++rowIndex) {
      horizontalLines.push({
        x1: widthShift,
        y1: rowIndex * rectHeight + heightShift,
        x2: (columnsCount - 1) * rectWidth + widthShift,
        y2: rowIndex * rectHeight + heightShift })
    }
    const verticalLines = []
    for (let columnIndex = 0; columnIndex < columnsCount; ++columnIndex) {
      verticalLines.push({
        x1: columnIndex * rectWidth + widthShift,
        y1: heightShift,
        x2: columnIndex * rectWidth + widthShift,
        y2: (rowsCount - 1) * rectHeight + heightShift })
    }
    return [...horizontalLines, ...verticalLines]
  }

  getGridPointRadius = (rowIndex, columnIndex) => {
    const { hoveredCell } = this.state
    const { hoverGridPointRadius, fillGridPointRadius, emptyGridPointRadius } = this.props
    if (this.getPin(rowIndex, columnIndex)) {
      return fillGridPointRadius
    } else if (hoveredCell.row === rowIndex && hoveredCell.column === columnIndex) {
      return hoverGridPointRadius
    }
    return emptyGridPointRadius
  }

  getGridPoints = () => {
    const { rowsCount, columnsCount } = this.props
    const { width: rectWidth, height: rectHeight } = this.getSquareSize()
    const heightShift = rectHeight / 2
    const widthShift = rectWidth / 2
    const result = []
    for (let rowIndex = 0; rowIndex < rowsCount; ++rowIndex) {
      for (let columnIndex = 0; columnIndex < columnsCount; ++columnIndex) {
        const radius = this.getGridPointRadius(rowIndex, columnIndex)
        result.push({ x: columnIndex * rectWidth + widthShift, y: rowIndex * rectHeight + heightShift, radius })
      }
    }
    return result
  }

  render () {
    const { rowsCount, width, height } = this.props
    const rows = []
    for (let row = 0; row < rowsCount; ++row) {
      rows.push(this.getRow(row))
    }
    return (
      <div className={classes.boardWrapper} style={{width, height}}>
        <div className={classes.boardContent}>
        {
          rows
        }
        </div>
        <div style={{width, height}} className={classes.gridWrapper}>
          <Grid
            lines={this.getLinePoints()}
            data={this.getGridPoints()}
            width={width}
            height={height}
          />
        </div>
      </div>
    )
  }
}

Board.propTypes = {
  hoverGridPointRadius: PropTypes.number,
  emptyGridPointRadius: PropTypes.number,
  fillGridPointRadius: PropTypes.number,
  data: PropTypes.array,
  pinSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  rowsCount: PropTypes.number,
  columnsCount: PropTypes.number,
  placePin: PropTypes.func
}

Board.defaultProps = {
  hoverGridPointRadius: HOVERED_GRID_POINT_RADIUS,
  emptyGridPointRadius: EMPTY_GRID_POINT_RADIUS,
  fillGridPointRadius: FILL_GRID_POINT_RADIUS
}

export default Board
