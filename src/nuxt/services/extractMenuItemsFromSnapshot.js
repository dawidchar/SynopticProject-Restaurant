import formatPrice from '~/utils/priceStringFormatter'

export default (menuCollectionSnapshot) => {
    const menuItems = {}

    menuCollectionSnapshot.forEach((doc) => {
        if (!doc.exists()) { return }

        const data = { ...doc.data(), id: doc.id }
        if (data.price) { data.priceString = formatPrice(data.price) }

        menuItems[data.itemId] = data
    })

    return menuItems
}
