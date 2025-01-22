import '../styles/reset.css'
import '../styles/styles.css'
import { Player } from './classes/Player.js'
import { Ship } from './classes/Ship.js'
import { UIManager } from './classes/UIManager.js'

const firstPlayer = new Player('real')
const secondPlayer = new Player()

const firstPlayerBoardContainer = document.querySelector('#first-player-board')
const secondPlayerBoardContainer = document.querySelector(
  '#second-player-board'
)

const uiManager = new UIManager({
  firstPlayer: {
    type: firstPlayer.type,
    gameBoard: firstPlayer.board,
    boardContainer: firstPlayerBoardContainer
  },
  secondPlayer: {
    type: secondPlayer.type,
    gameBoard: secondPlayer.board,
    boardContainer: secondPlayerBoardContainer
  }
})

// For testing purposes
firstPlayer.board.placeShip([4, 4], 'vertical', new Ship(3))
firstPlayer.board.placeShip([5, 4], 'vertical', new Ship(3))
secondPlayer.board.placeShip([4, 4], 'horizontal', new Ship(3))
uiManager.rerenderBoards()

secondPlayerBoardContainer.addEventListener('click', ({ target }) => {
  if (!target.classList.contains('tile')) {
    return
  }

  const { x, y } = target.dataset

  secondPlayer.board.receiveAttack([x, y])
  firstPlayer.board.simulateComputerMove()
  uiManager.rerenderBoards()
})
