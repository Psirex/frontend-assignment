import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

const FILL_COLOR = 'white'
const STROKE_COLOR = '#16a085'
const STROKE_WIDTH = 3
const ANIMATION_DURATION = 250

class Grid extends Component {
  componentDidMount () {
    this.drawChart()
  }

  componentDidUpdate () {
    this.drawChart()
  }

  componentWillUnmount () {
    ReactDOM.unmountComponentAtNode(this.node)
  }

  drawChart () {
    const { node } = this
    const {data, lines, backgroundColor, strokeColor, strokeWidth, animationDuration} = this.props
    const t = d3.transition()
      .duration(animationDuration)

    d3.select(node)
      .selectAll('line')
      .data(lines)
      .enter()
      .append('line')
      .attr('x1', d => d.x1)
      .attr('y1', d => d.y1)
      .attr('x2', d => d.x2)
      .attr('y2', d => d.y2)
      .attr('stroke-width', strokeWidth)
      .style('stroke', strokeColor)

    d3.select(node)
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')

    d3.select(node)
      .selectAll('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('stroke-width', strokeWidth)
      .style('stroke', strokeColor)
      .style('fill', backgroundColor)
      .transition(t)
      .attr('r', d => d.radius)
  }

  setNode = (node) => {
    this.node = node
  }

  render () {
    const { width, height, backgroundColor } = this.props
    return (
      <svg
        style={{background: backgroundColor}}
        ref={this.setNode}
        width={width}
        height={height}
      />
    )
  }
}

Grid.propTypes = {
  backgroundColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  animationDuration: PropTypes.number,
  data: PropTypes.array,
  lines: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number
}

Grid.defaultProps = {
  backgroundColor: FILL_COLOR,
  strokeColor: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  animationDuration: ANIMATION_DURATION
}

export default Grid
