const Firmata = require("firmata");
const board = new Firmata("COM14");

board.on("ready", () => {
    // Arduino is ready to communicate
    console.log(board.MODES);
    console.log(board.pins);
    console.log(board.analogPins);
    board.analogRead(0, function(value) {
        console.log("The value of pin A0 is " + value + " as reported at the sampling interval");
        board.reportAnalogPin(0, 0);
        board.reportAnalogPin(0, 1);
      });
});