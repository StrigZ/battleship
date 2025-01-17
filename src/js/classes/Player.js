import { GameBoard } from './GameBoard'

export class Player {
  constructor(type = 'computer') {
    this.board = new GameBoard()
    this.type = type
  }
}
