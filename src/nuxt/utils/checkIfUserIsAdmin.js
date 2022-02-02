export default (context, user) => {
    if (user.admin === true) {
        const { store: { dispatch } } = context
        dispatch('enableAdminMode', context)
    }
}
