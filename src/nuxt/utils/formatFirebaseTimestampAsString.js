import moment from 'moment'
import ensureUnix from '~/utils/ensureUnix'

export default (timestamp) => {
    const timestampSeconds = ensureUnix(timestamp)
    const time = moment(timestampSeconds, 'X', true)
    if (!time.isValid()) { return 'Invalid Timestamp' }

    return time.format('ddd D/M/YY - H:mm')
}
