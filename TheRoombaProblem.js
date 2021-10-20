const RoombaCreator = require('./helpers/CreateRoomba.js');

// check if valid number of inputs was provided when running this javascript
if (process.argv.length != 3) {
  console.log("Invalid number of arguments in the command line.")
  process.exit(1);
}
// successful number of args
else {    
  let theRoomba = createRoomba(process.argv[2]);
  
  theRoomba.navigateRoom();

  console.log(theRoomba.getPosition());
  console.log(theRoomba.getNumSpacesCleaned());  
}
