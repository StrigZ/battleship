import { compareArrays } from '../utility'
import { Ship } from './Ship'

export class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null))
    this.struckTiles = []
    this.ships = []
    this.isGameOver = false
  }
  placeShip(cords, direction, ship) {
    this.ships.push(ship)
    const [x, y] = cords
    for (let i = 0; i < ship.length; i++) {
      if (direction === 'vertical') {
        if (this.#isInBounds(x, y - i) && this.#isEmpty(x, y - i)) {
          this.board[x][y - i] = ship
        }
      } else if (direction === 'horizontal') {
        if (this.#isInBounds(x - i, y) && this.#isEmpty(x - i, y)) {
          this.board[x - i][y] = ship
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
    if (this.isStruck(cords)) {
      return
    }
    this.struckTiles.push(cords)

    const [x, y] = cords

    if (this.board[x][y] instanceof Ship) {
      this.board[x][y].hit()
      this.#areAllShipsSunk()
    }
  }
  isStruck(cords) {
    let isStruck = false
    this.struckTiles.forEach((tile) => {
      if (compareArrays(tile, cords)) {
        isStruck = true
      }
    })
    return isStruck
  }
  simulateComputerMove() {
    let randomTile = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    ]
    while (this.isStruck(randomTile)) {
      randomTile = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]
    }
    this.receiveAttack(randomTile)
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
    if (this.board[x][y] instanceof Ship) {
      throw new Error('Ship collision!')
    }
    return true
  }
}
