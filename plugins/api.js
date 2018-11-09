import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

export default {
  axios: axios.create(options),
  handleApiError: response => {
    console.error(JSON.stringify(response))
    error({statusCode: response.status(), message: response.message()})
  }
}
