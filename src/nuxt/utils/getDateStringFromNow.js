import moment from 'moment'

export default (delta, format = 'DD/MM/YYYY') => {
    return moment()
        .add(delta)
        .format(format)
}
