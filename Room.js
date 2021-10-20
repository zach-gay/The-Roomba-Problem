class Room {
    constructor(roomWidth, roomLength, dirtPatches) {          
      this.roomWidthIndex = roomWidth - 1;
      this.roomLengthIndex = roomLength - 1;
      this.room = this.generateRoom(roomWidth, roomLength, dirtPatches);
      this.totalDirtPatches = dirtPatches.size;
    }

    generateRoom = (roomWidth, roomLength, dirtPatches) => {
        let room = new Map();
        for (let i = 0; i < roomWidth; i++){
            for (let k = 0; k < roomLength; k++){
                let positionKey = i + " " + k;
                let isDirty = dirtPatches.has(positionKey);
                room.set(positionKey, isDirty);
            }
        }        
        return room;
    }    

    calculatePatchesCleaned = () => {
        return this.totalDirtPatches - this.calculateRemainingDirtPatches();
    }      

    calculateRemainingDirtPatches = () => {
        let valuesIterator = this.room.values();        
        let numDirtyPatches = 0;
        for (let value of valuesIterator){            
            if (value == true){
                numDirtyPatches++;
            }
        }        
        return numDirtyPatches;
    }

    cleanPosition = (positionX, positionY) => {
        if (this.room.has(positionX + " " + positionY)){            
            this.room.set(positionX + " " + positionY, false)            
        }
    }
  }
  
  module.exports = Room;