import api from '../api'

export default {
  update: async (user) => {
    const response = await api.axios.put(`/api/users/${user._id}`)

    if (response.status !== 200) {
      api.handleApiError(response)
    }

    console.info('Updated user...')
  },
  getUsers: async () => {
    let { data } = await api.axios.get('/api/users')

    return data
  },
  getUser: async (id) => {
    let { data } = await api.axios.get(`/api/users/${id}`)
    return data
  }
}
