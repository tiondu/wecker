input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Weckzeit_Berechnung = DS1307.getHour() + 10
    if (Weckzeit_Berechnung >= 24) {
        Weckzeit_Berechnung = Weckzeit_Berechnung - 24
    }
    if (Weckzeit_Berechnung < 10) {
        Weckzeit_Stunde = "0" + convertToText(Weckzeit_Berechnung)
    } else {
        Weckzeit_Stunde = convertToText(Weckzeit_Berechnung)
    }
    if (DS1307.getMinute() < 10) {
        Weckzeit_Minute = "0" + convertToText(DS1307.getMinute())
    } else {
        Weckzeit_Minute = convertToText(DS1307.getMinute())
    }
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 0, 15, "um " + Weckzeit_Stunde + ":" + Weckzeit_Minute + " Uhr")
})
let Minuten = ""
let Stunden = ""
let Weckzeit_Berechnung = 0
let Weckzeit_Minute = ""
let Weckzeit_Stunde = ""
Weckzeit_Stunde = convertToText(18)
Weckzeit_Minute = convertToText(55)
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 0, 15, lcd16x2rgb.lcd16x2_text("Wecker klingelt"))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 0, 15, "um " + Weckzeit_Stunde + ":" + Weckzeit_Minute + " Uhr")
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
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
    if (Stunden == Weckzeit_Stunde && Minuten == Weckzeit_Minute) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 0, 0, 15, lcd16x2rgb.lcd16x2_text("Jonathan"))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2), 1, 0, 15, lcd16x2rgb.lcd16x2_text("aufstehen!"))
        for (let index = 0; index < 24; index++) {
            music.play(music.stringPlayable("C D E F G A B C5 ", 140), music.PlaybackMode.UntilDone)
        }
    }
    control.waitMicros(6000)
})
