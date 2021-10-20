LineReaderSync = require("line-reader-sync");
const Room = require('./Room.js');
const Roomba = require('./Roomba.js');

// props to house values needed to create objects
let roomDimensions;
let startingPosition;
let dirtPatchPositions = new Map();
let directions = [];

// check if valid number of inputs was provided when running this javascript
if (process.argv.length != 3) {
  console.log("Invalid number of arguments in the command line.")
  process.exit(1);
}
// successful number of args
else {  
  // parse inputted file into an array where each position in the array is a line in the file
  let lines;
  try {
    let lrs = new LineReaderSync(process.argv[2]);
    lines = lrs.toLines();
  } catch(err){
    console.log("Error processing the inputted file.")
    process.exit(1);
  }

  // set roomDimensions
  try {
    roomDimensions = lines[0].split(' ').map((element) => {
      return parseInt(element);
    });
    if (roomDimensions.length != 2) {
      console.log("Room Dimensions not valid: " + line);
      process.exit(1);
    }
  } catch (err) {
    console.log("Error processing the line providing room dimensions.")
    process.exit(1);
  }

  // set startingPosition
  try {    
    startingPosition = lines[1].split(' ').map((element) => {
      return parseInt(element);
    });
    if (startingPosition.length != 2) {
      console.log("Starting Position not valid: " + line);
      process.exit(1);
    }
  } catch (err) {
    console.log("Error processing the line providing the roomba's starting positions.")
    process.exit(1);
  }
  
  // set dirtPatchPositions and directions
  try {
    for (let i = 2; i < lines.length; i++){
      let isDirections = /^[a-zA-Z]+$/.test(lines[i]);
      if (isDirections){
        directions.push(lines[i]);
      }
      else {
        let dirtPatchPosition = lines[i].split(' ');
        if (dirtPatchPosition.length != 2) {
          console.log("Dirt Patch Position not valid on line number " + i);
          process.exit(1);
        }
        dirtPatchPositions.set(parseInt(dirtPatchPosition[0]) + " " + parseInt(dirtPatchPosition[1]), true);
      }
    }
  } catch (err) {
    console.log("Error processing the directions for the roomba or the dirt patch positions.")
    process.exit(1);
  }  

  let theRoomba = new Roomba(startingPosition[0], startingPosition[1], new Room(roomDimensions[0], roomDimensions[1], dirtPatchPositions));
  
  for (let j = 0; j < directions.length; j++){
    for (let k = 0; k < directions[j].length; k++){
      theRoomba.navigateRoom(directions[j][k]);
    }
  }

  console.log(theRoomba.getPosition());
  console.log(theRoomba.getNumSpacesCleaned());  
}
