import moment from 'moment'

export default (delta, startFromNextDay) => {
    return moment()
        .startOf('day')
        .add(startFromNextDay ? 1 : 0, 'days')
        .add(delta)
        .unix()
}
