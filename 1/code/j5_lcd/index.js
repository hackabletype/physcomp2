var five = require("johnny-five"),
  board, lcd;

board = new five.Board();

board.on("ready", function() {


  //configure the j5 LCD
  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 12  11   5   4   3   2
    pins: [12, 11, 5, 4, 3, 2],
    backlight: 6,
    rows: 2,
    cols: 16
  });

  // Tell the LCD you will use these characters:
  lcd.useChar("check");
  lcd.useChar("heart");
  lcd.useChar("duck");

  lcd.clear();
  lcd.cursor(1, 0);
  lcd.print("I :heart: furries!");

  this.wait(3000, function() {
    lcd.clear().cursor(0, 0).print("I :check::heart: 2 :duck: :)");
  });


  this.repl.inject({
    lcd: lcd
  });
});
