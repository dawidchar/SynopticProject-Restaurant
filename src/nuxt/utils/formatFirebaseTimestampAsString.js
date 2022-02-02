import moment from 'moment'

export default (timestamp) => {
    const timestampSeconds = timestamp.seconds || timestamp
    const time = moment(timestampSeconds, 'X', true)
    if (!time.isValid()) { return 'Invalid Timestamp' }

    return time.format('ddd D/M/YY - H:mm')
}
