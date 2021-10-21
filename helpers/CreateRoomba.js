const LineReaderSync = require("line-reader-sync");
const Room = require('../classes/Room.js');
const Roomba = require('../classes/Roomba.js');

createRoomba = (file) => {

    // props to house values needed to create objects
    let roomDimensions;
    let startingPosition;
    let dirtPatchPositions = new Map();
    let directions = [];

    // parse inputted file into an array where each position in the array is a line in the file
    let lines;
    try {        
        let lineReaderSync = new LineReaderSync(file);
        lines = lineReaderSync.toLines();
    } catch (err) {
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
        if (startingPosition.length != 2 || startingPosition[0] >= roomDimensions[0] || startingPosition[1] >= roomDimensions[1]) {
            console.log("Starting Position not valid: " + line);
            process.exit(1);
        }
    } catch (err) {
        console.log("Error processing the line providing the roomba's starting positions.")
        process.exit(1);
    }

    // set dirtPatchPositions and directions
    try {
        for (let i = 2; i < lines.length; i++) {
            let isDirections = /^[a-zA-Z]+$/.test(lines[i]);
            if (isDirections) {
                directions.push(lines[i]);
            }
            else {
                let dirtPatchPosition = lines[i].split(' ').map((element) => {
                    return parseInt(element);
                });
                if (dirtPatchPosition.length != 2 || dirtPatchPosition[0] >= roomDimensions[0] || dirtPatchPosition[1] >= roomDimensions[1]) {
                    console.log("Dirt Patch Position not valid on line number " + i);
                    process.exit(1);
                }
                dirtPatchPositions.set(dirtPatchPosition[0] + " " + dirtPatchPosition[1], true);
            }
        }
    } catch (err) {
        console.log("Error processing the directions for the roomba or the dirt patch positions.")
        process.exit(1);
    }

    return new Roomba(startingPosition[0], startingPosition[1], directions, new Room(roomDimensions[0], roomDimensions[1], dirtPatchPositions));
}

module.exports.roombaCreator = createRoomba;