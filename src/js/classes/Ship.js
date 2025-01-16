export class Ship {
  constructor(length) {
    this.length = length
    this.isSunk = false
    this.hitTaken = 0
  }
  hit() {
    if (this.isSunk) {
      return
    }

    this.hitTaken++
    this.checkIsSunk()
  }
  checkIsSunk() {
    if (this.hitTaken === this.length) {
      this.isSunk = true
    }
  }
}
