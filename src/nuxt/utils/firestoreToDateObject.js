import moment from 'moment'

export default (timestamp) => {
    const timestampSeconds = timestamp.seconds || timestamp
    const time = moment(timestampSeconds, 'X', true)
    if (!time.isValid()) { return undefined }

    return new Date(time.toDate())
}
