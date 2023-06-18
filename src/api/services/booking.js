const postBooking = ({ db, dbTimestamp, dayjs, logger }) => async (req, res) => {
    const payload = req.body
    if (!payload && typeof payload !== 'object') {
        res.sendStatus(400)
    }

    const timestampStart = dayjs(`${payload.date} ${payload.time}`, 'YYYY-MM-DD HH:mm', true)
    if (!timestampStart.isValid()) { return res.status(400).send('Invalid Date or Time') }
    const timestampEnd = timestampStart.add(payload.duration, 'minute')

    // TODO - Verify Body Contains Valid Data Only
    const DTO = {
        name: payload.name,
        email: payload.email,
        numberOfPeople: payload.numberOfPeople,
        phoneNumber: payload.phoneNumber,
        timestampStart: dbTimestamp.fromMillis(timestampStart.valueOf()),
        timestampEnd: dbTimestamp.fromMillis(timestampEnd.valueOf()),
    }

    logger.info(DTO, `Booked Table for ${DTO.name}`)

    db.collection('bookings').add(DTO).then(() => {
        res.send('Success')
    }).catch((e) => {
        res.status(500).send('An Error Occured Saving your Booking')
        logger.error('Error Occured Creating a Booking document')
        throw new Error(e)
    })
}

module.exports.postBooking = postBooking