export default class Pin {
  constructor (id, row, column) {
    this.id = id
    this.row = row
    this.column = column
    this.placed = null
  }

  getText () {
    return `${this.row + 1}:${this.column + 1}`
  }

  place (row, column) {
    this.placed = [row, column]
  }

  unplace () {
    this.placed = null
  }

  getPlaceCoords () {
    if (!this.placed) {
      return null
    }
    return {row: this.placed[0], column: this.placed[1]}
  }
}
