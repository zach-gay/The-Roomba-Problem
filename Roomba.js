class Roomba {
  constructor(startX, startY, theRoom) {
    this.positionX = startX;
    this.positionY = startY;    
    this.room = theRoom;
  }

  navigateRoom = (direction) => {
      switch(direction){
          case 'N':
              if (this.positionY < this.room.roomLengthIndex){
                  this.positionY++;
              }              
              break;
          case 'E':
              if (this.positionX < this.room.roomWidthIndex){
                  this.positionX++;
              }
              break;
          case 'S':
              if (this.positionY > 0){
                  this.positionY--;
              }
              break;
          case 'W':
              if (this.positionX > 0){
                  this.positionX--;
              }
              break;
          default:
              break;
      }      
      this.room.cleanPosition(this.positionX, this.positionY);
  }

  getPosition = () => {
      return this.positionX + " " + this.positionY
  }

  getNumSpacesCleaned = () => {
      return this.room.calculatePatchesCleaned();
  }
}

module.exports = Roomba;