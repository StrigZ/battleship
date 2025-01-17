import { Ship } from './Ship'

export class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null))
    this.hitTiles = []
    this.ships = []
    this.isGameOver = false
  }
  placeShip(cords, direction, ship) {
    this.ships.push(ship)
    const [x, y] = cords
    for (let i = 0; i < ship.length; i++) {
      if (direction === 'vertical') {
        if (this.#isInBounds(x, y - i) && this.#isEmpty(x, y - i)) {
          this.board[y - i][x] = ship
        }
      } else if (direction === 'horizontal') {
        if (this.#isInBounds(x - i, y) && this.#isEmpty(x - i, y)) {
          this.board[y][x - i] = ship
        }
      }
    }
  }
  receiveAttack(cords) {
    if (this.isGameOver) {
      throw new Error('Game is over!')
    }
    if (cords === undefined || cords.length < 2) {
      throw new Error('Coordinates are not provided!')
    }

    const [x, y] = cords
    if (this.hitTiles.includes(JSON.stringify([x, y]))) {
      return
    }
    this.hitTiles.push(JSON.stringify([x, y]))

    if (this.board[y][x] instanceof Ship) {
      this.board[y][x].hit()
      this.#areAllShipsSunk()
    }
  }
  #areAllShipsSunk() {
    if (
      this.ships.length > 0 &&
      this.ships.map((ship) => ship.isSunk).every((v) => v === true)
    ) {
      this.isGameOver = true
    }
  }
  #isInBounds(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      throw new Error('Coordinates are out of bounds!')
    }
    return true
  }
  #isEmpty(x, y) {
    if (this.board[y][x] instanceof Ship) {
      throw new Error('Ship collision!')
    }
    return true
  }
}
