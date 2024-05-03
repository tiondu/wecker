let Minuten = ""
let Stunden = ""
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 0, 15, lcd16x2rgb.lcd16x2_text("Wecker klingelt"))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 0, 15, lcd16x2rgb.lcd16x2_text("um 7:00 Uhr"))
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
_4digit.point(true)
DS1307.stop()
DS1307.DateTime(
2024,
5,
3,
5,
20,
29,
10
)
DS1307.start()
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
    if (DS1307.getHour() == 7 && DS1307.getMinute() == 0) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 0, 15, lcd16x2rgb.lcd16x2_text("Jonathan"))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 0, 15, lcd16x2rgb.lcd16x2_text("aufstehen!"))
        for (let index = 0; index < 24; index++) {
            music.play(music.stringPlayable("C D E F G A B C5 ", 140), music.PlaybackMode.UntilDone)
        }
    }
    control.waitMicros(6000)
})
