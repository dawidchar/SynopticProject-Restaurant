const postOrder = ({ db, logger, serverTimestamp, fieldIncrement }) => async (req, res) => {
    const payload = req.body
    const authUser = res.locals.user
    if (!payload && typeof payload !== 'object') {
        res.sendStatus(400)
    }
    if (!authUser) { res.sendStatus(403) }

    const DTO = {
        timestamp: serverTimestamp,
        userId: authUser.uid
    }

    // Get User Basket
    const userBasket = await db.collection('basket').doc(authUser.uid).get().then(doc => doc.data()).catch(() => undefined)

    // Iterate over User basket and get item data, i.e. Price and Name (Ensures the user does not change the price)
    const userMenuItems = (await Promise.all(Object.values(userBasket.items).map(async (basketItem) => {

        if (!basketItem.itemId) { return null }
        const menuItem = await db.collection('menu').where('itemId', '==', basketItem.itemId).limit(1).get().then(
            querySnap => !querySnap.empty ? ({ ...querySnap.docs[0].data(), id: querySnap.docs[0].id }) : undefined).catch(() => undefined)

        if (!menuItem) {
            logger.error(`Can't Find Menu Item - ${basketItem.itemId}`)
            return null
        }

        const availableQuantity = Math.min(parseInt(basketItem.quantity), parseInt(menuItem.stock))

        // Decrement Stock Levels by quantity ordered
        await db.collection('menu').doc(menuItem.id).set({
            stock: fieldIncrement(-availableQuantity)
        }, { merge: true })

        return {
            itemId: basketItem.itemId,
            quantity: availableQuantity,
            name: menuItem.name,
            total: menuItem.price * availableQuantity
        }
    }))).filter(i => !!i)

    // Calculate Order total
    const basketTotal = userMenuItems.reduce((prev, cur) => prev + cur.total, 0)

    DTO.items = userMenuItems
    DTO.total = basketTotal

    logger.info(DTO, `${DTO.userId} Placed an Order`)

    await db.collection('basket').doc(authUser.uid).delete().catch((e) => {
        logger.error(e, `Failed to Delete user basket - ${DTO.uid}`)
    })

    await db.collection('orders').add(DTO).catch((e) => {
        logger.error(e, `Failed to Create user Order - ${DTO.uid}`)
    })

    res.send('Success')
}

module.exports.postOrder = postOrder