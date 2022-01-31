const formatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })

export default (price) => {
    return formatter.format(price / 100)
}
