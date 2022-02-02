import updateUserBasket from '~/services/updateUserBasket.service'

export default (context) => {
    const { store } = context
    store.subscribe((mutation, state) => {
        const splitMutation = mutation.type.split('/')
        if (splitMutation[0] === 'basket' &&
        !(splitMutation[1] || '').startsWith('LOCAL')) {
            updateUserBasket(context, ({ items: state.basket.items }))
        }
    })
}
