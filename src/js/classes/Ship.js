export class Ship {
  constructor(length) {
    this.length = length
    this.isSunk = false
    this.hitsTaken = 0
  }
  hit() {
    if (this.isSunk) {
      return
    }

    this.hitsTaken++
    this.checkIsSunk()
  }
  checkIsSunk() {
    if (this.hitsTaken === this.length) {
      this.isSunk = true
    }
  }
}
