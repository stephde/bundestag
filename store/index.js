import Vue from 'vue'
import Vuex from 'vuex'
import api from '~/plugins/api'
import userService from '~/plugins/service/userService'

Vue.use(Vuex)

const state = () => ({
  authUser: null
})

const getters = {
  user: state => state.authUser
}

const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_ARTICLE_READ: (state, articleId) => {
    if (!state.authUser.readArticles.includes(articleId)) {
      state.authUser.readArticles.push(articleId)
    }
  },
  LIKE_ARTICLE: (state, articleId) => {
    if (!state.authUser.likedArticles.includes(articleId)) {
      state.authUser.likedArticles.push(articleId)
    }
  },
  DISLIKE_ARTICLE: (state, articleId) => {
    if (!state.authUser.dislikedArticles.includes(articleId)) {
      state.authUser.dislikedArticles.push(articleId)
    }
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
      const { data } = await api.axios.post('/api/login', { email, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await api.axios.post('/api/logout')
    commit('SET_USER', null)
  },

  async signUp ({commit}, {email, password, username}) {
    try {
      const { data } = await api.axios.post('/api/users', {email, password, username})
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error('Incomplete data')
      }
      throw error
    }
  },

  async articleRead ({commit}, {user, articleId}) {
    await updateUserArticle(user, articleId, 'readArticles')
    commit('SET_ARTICLE_READ', articleId)
  },

  async likeArticle ({commit}, {user, articleId}) {
    await updateUserArticle(user, articleId, 'likedArticles')
    commit('LIKE_ARTICLE', articleId)
  },

  async dislikeArticle ({commit}, {user, articleId}) {
    await updateUserArticle(user, articleId, 'dislikedArticles')
    commit('DISLIKE_ARTICLE', articleId)
  }
}

function updateUserArticle (user, articleId, attributeKey) {
  const userCopy = Object.assign({}, user)

  if (userCopy[attributeKey].includes(articleId)) {
    return
  }

  userCopy[attributeKey].push(articleId)
  return userService.update(userCopy)
}

const store = () => new Vuex.Store({state, mutations, actions, getters})

export default store
