import React, { Component, PropTypes } from 'react'
import classes from './Rectangle.scss'

class Rectangle extends Component {
  render () {
    const { width, height, children } = this.props
    return (
      <div className={classes.squareWrapper} style={{width, height}}>
        {children}
      </div>
    )
  }
}

Rectangle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node
}

export default Rectangle
