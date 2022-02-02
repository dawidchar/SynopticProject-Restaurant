export default ({ route, redirect, store: { state } }) => {
    if (route.path.split('/')[1].toLowerCase() === 'admin' && !state.user.admin) {
        redirect('/')
    }
}
