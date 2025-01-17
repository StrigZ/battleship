import { Player } from './Player'

describe('Player class', () => {
  it('Should have board property', () => {
    const player = new Player()
    expect(player.board).not.toBe(undefined)
  })
})
