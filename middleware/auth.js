export default function ({ store, error }) {
  if (!store.state.authUser) {
    //ToDo: try to fetch user from backend with session
    error({
      message: 'You are not logged in',
      statusCode: 403
    })
  }
}
