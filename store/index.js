import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = () => ({
  authUser: null
})

const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login ({ commit }, { email, password }) {
    try {
      const { data } = await axios.post('/api/login', { email, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  },

  async signUp ({commit}, {email, password, username}) {
    try {
      const { data } = await axios.post('/api/users', {email, password, username})
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error('Incomplete data')
      }
      throw error
    }
  }
}

const store = () => new Vuex.Store({state, mutations, actions})

export default store
