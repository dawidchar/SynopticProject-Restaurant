// TODO - Consider using an alterntive instead - i.e. DayJS
// https://momentjs.com/docs/#/-project-status/
import moment from 'moment'

export default (timeStart, timeEnd, interval) => {
    const result = []
    const start = moment(timeStart, ['HH:mm', 'H:mm'], true)
    const end = moment(timeEnd, ['HH:mm', 'H:mm'], true)
    if (!start.isValid() || !end.isValid()) { return result }

    while (!start.isAfter(end)) {
        result.push(start.format('H:mm'))
        start.add(interval, 'm')
    }

    return result
}
