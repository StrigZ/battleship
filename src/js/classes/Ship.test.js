import { Ship } from './Ship'

describe('Ship class', () => {
  it('Should increase hit amount when hit method is used', () => {
    const ship = new Ship(5)
    ship.hit()
    expect(ship.hitTaken).toBe(1)
  })
  it('Should make the ship sunk when hitTaken is equal ship length', () => {
    const ship = new Ship(5)
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk).toBe(true)
  })
})
