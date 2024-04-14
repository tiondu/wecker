let Minuten = ""
let Stunden = ""
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 0, 15, lcd16x2rgb.lcd16x2_text("Wecker klingelt"))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 0, 15, lcd16x2rgb.lcd16x2_text("um 13:50 Uhr"))
DS1307.stop()
DS1307.DateTime(
2024,
4,
14,
4,
9,
52,
0
)
DS1307.start()
_4digit.point(true)
basic.forever(function () {
    if (DS1307.getHour() < 10) {
        Stunden = "0" + DS1307.getHour()
    } else {
        Stunden = convertToText(DS1307.getHour())
    }
    if (DS1307.getMinute() < 10) {
        Minuten = "0" + DS1307.getMinute()
    } else {
        Minuten = convertToText(DS1307.getMinute())
    }
    _4digit.show(parseFloat("" + Stunden + Minuten))
    if (DS1307.getHour() == 13 && DS1307.getMinute() == 50) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 0, 15, lcd16x2rgb.lcd16x2_text("Joni deine Gäste"))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 0, 15, lcd16x2rgb.lcd16x2_text("kommen gleich!"))
        for (let index = 0; index < 24; index++) {
            music.play(music.stringPlayable("C D E F G A B C5 ", 140), music.PlaybackMode.UntilDone)
        }
    }
    control.waitMicros(6000)
})
