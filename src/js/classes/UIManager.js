import { Ship } from './Ship'

export class UIManager {
  constructor(players) {
    this.players = players
    this.isAgainstComputer = false
    this.currentPlayerIndex = 0
    this.#renderBoards()
    this.#calculateIsAgainstComputer()
  }
  updateTile({ board, cords }) {
    const [x, y] = cords
    Array.from(Array.from(board.children)[x].children)[y].textContent = 'S'
  }
  rerenderBoards() {
    Object.values(this.players).forEach(({ boardContainer, gameBoard }, i) => {
      const { board } = gameBoard
      const columns = Array.from(boardContainer.children)
      columns.forEach((col) => {
        const tiles = Array.from(col.children)
        tiles.forEach((tile) => {
          console.log(tile)
          const { x, y } = tile.dataset
          const isShip = board[x][y] instanceof Ship
          const isStruck = gameBoard.isStruck([x, y])
          if (isShip && isStruck) {
            tile.textContent = i === this.currentPlayerIndex ? 'X' : undefined
            tile.classList.add('hit-ship')
          } else if (isShip) {
            tile.textContent = i === this.currentPlayerIndex ? 'X' : undefined
          } else if (isStruck) {
            tile.classList.add('hit-empty')
          }
        })
      })
    })
  }
  #calculateIsAgainstComputer() {
    this.isAgainstComputer =
      (this.players.firstPlayer.type === 'real' &&
        this.players.secondPlayer.type === 'computer') ||
      (this.players.firstPlayer.type === 'computer' &&
        this.players.secondPlayer.type === 'real')
  }
  #renderBoards() {
    Object.values(this.players).forEach(({ gameBoard, boardContainer }) => {
      boardContainer.classList.add('board')
      const { board } = gameBoard
      board.forEach((col, x) => {
        const colContainer = document.createElement('div')
        colContainer.classList.add('col')
        col.forEach((_, y) => {
          const tileContainer = document.createElement('div')
          tileContainer.dataset.x = x
          tileContainer.dataset.y = y
          tileContainer.classList.add('tile')
          colContainer.append(tileContainer)
        })
        boardContainer.append(colContainer)
      })
    })
  }
}
