let Minuten = ""
let Stunden = ""
let _4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
DS1307.stop()
DS1307.DateTime(
2024,
4,
13,
4,
21,
48,
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
    if (DS1307.getHour() == 7 && DS1307.getMinute() == 15) {
        for (let index = 0; index < 24; index++) {
            music.play(music.stringPlayable("C D E F G A B C5 ", 140), music.PlaybackMode.UntilDone)
        }
    }
    control.waitMicros(6000)
})
