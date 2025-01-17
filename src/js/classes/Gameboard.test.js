import { GameBoard } from './GameBoard'
import { Ship } from './Ship'

describe('GameBoard class', () => {
  it('Should create 2D 10x10 matrix on instantiating', () => {
    const gameBoard = new GameBoard()
    expect(gameBoard.board).toEqual(
      Array(10)
        .fill()
        .map(() => Array(10).fill(null))
    )
  })
  describe('Should have a place method that accepts x,y coordinates and places ship in that coordinates', () => {
    it('Should have a way to place ship vertically', () => {
      const gameBoard = new GameBoard()
      const ship = new Ship(4)
      gameBoard.placeShip([4, 4], 'vertical', ship)
      expect(gameBoard.board[1][4]).toStrictEqual(ship)
      expect(gameBoard.board[2][4]).toStrictEqual(ship)
      expect(gameBoard.board[3][4]).toStrictEqual(ship)
      expect(gameBoard.board[4][4]).toStrictEqual(ship)
    })
    it('Should have a way to place ship horizontally', () => {
      const gameBoard = new GameBoard()
      const ship = new Ship(4)
      gameBoard.placeShip([4, 4], 'horizontal', ship)
      expect(gameBoard.board[4][1]).toStrictEqual(ship)
      expect(gameBoard.board[4][2]).toStrictEqual(ship)
      expect(gameBoard.board[4][3]).toStrictEqual(ship)
      expect(gameBoard.board[4][4]).toStrictEqual(ship)
    })
    it('Should throw an error if two ships collides with each other', () => {
      const gameBoard = new GameBoard()
      const ship = new Ship(4)
      gameBoard.placeShip([4, 4], 'horizontal', ship)
      expect(() => gameBoard.placeShip([4, 4], 'vertical', ship)).toThrow(
        'Ship collision!'
      )
    })
    it('Should throw an error if ship is out of bounds', () => {
      const gameBoard = new GameBoard()
      const ship = new Ship(6)
      expect(() => gameBoard.placeShip([9, 1], 'vertical', ship)).toThrow(
        'Coordinates are out of bounds!'
      )
      expect(() => gameBoard.placeShip([2, 1], 'horizontal', ship)).toThrow(
        'Coordinates are out of bounds!'
      )
    })
  })
  describe('Should have a receiveAttack function that takes a pair of coordinates', () => {
    it('Should exist', () => {
      const gameBoard = new GameBoard()
      expect(() => gameBoard.receiveAttack([1, 3])).not.toThrow(Error)
    })
    it('Should increase hitTaken property of the ship on passed cords', () => {
      const gameBoard = new GameBoard()
      const ship = new Ship(4)
      gameBoard.placeShip([4, 4], 'vertical', ship)
      gameBoard.receiveAttack([4, 4])
      expect(ship.hitTaken).toBe(1)
    })
    it("Should add passed coordinates to hitTiles array if it doesn't exist already", () => {
      const gameBoard = new GameBoard()
      gameBoard.receiveAttack([4, 4])
      expect(gameBoard.board[4][4]).toBe(null)
      expect(gameBoard.hitTiles).toContain(JSON.stringify([4, 4]))
    })
    it('Should do nothing if tile at these coordinates was hit already', () => {
      const gameBoard = new GameBoard()
      const ship = new Ship(2)
      gameBoard.placeShip([4, 4], 'vertical', ship)
      gameBoard.receiveAttack([4, 4])
      gameBoard.receiveAttack([4, 4])
      expect(ship.hitTaken).toBe(1)
    })
    it('Should throw an error if cords are not provided', () => {
      const gameBoard = new GameBoard()
      expect(() => gameBoard.receiveAttack()).toThrow(
        'Coordinates are not provided!'
      )
    })
    it('Should throw an error if only one part of coordinates are provided', () => {
      const gameBoard = new GameBoard()
      expect(() => gameBoard.receiveAttack([1])).toThrow(
        'Coordinates are not provided!'
      )
    })
    it('Should throw an if game is over', () => {
      const gameBoard = new GameBoard()
      gameBoard.isGameOver = true
      expect(() => gameBoard.receiveAttack([1])).toThrow('Game is over!')
    })
  })
  it('Should keep track of missed attacks so they can display them properly', () => {
    const gameBoard = new GameBoard()
    gameBoard.receiveAttack([1, 1])
    expect(gameBoard.hitTiles).toContain(JSON.stringify([1, 1]))
  })
  it('Should be able to report whether or not all of their ships have been sunk.', () => {
    const gameBoard = new GameBoard()
    expect(gameBoard.isGameOver).toBe(false)
    const ship = new Ship(3)
    gameBoard.placeShip([4, 4], 'vertical', ship)
    gameBoard.receiveAttack([4, 4])
    gameBoard.receiveAttack([4, 3])
    gameBoard.receiveAttack([4, 2])

    expect(gameBoard.isGameOver).toBe(true)
  })
})
