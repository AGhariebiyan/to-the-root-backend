import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  token: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  token: (state) => state.token,
}

export const mutations: MutationTree<RootState> = {
  SET_TOKEN: (state, token: string) => {
    state.token = token
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async loginUser({ commit }, { identifier, password }) {
    const response = await $axios
      .$post(`/auth/local`, {
        identifier,
        password,
      })
      .catch((err) => {
        console.log('Error!', err.response.data)
        return err.response.data
      })

    if (!response.jwt) {
      console.log('Error!', response, response)
      return response
    }

    commit('SET_TOKEN', response.jwt)
    console.log('Good!', response, response)
    return response
  },

  async registerUser({ commit }, { username, email, password }) {
    const response = await $axios
      .$post(`/auth/local/register`, {
        username,
        email,
        password,
      })
      .catch((err) => {
        console.log('Error!', err, err.data)
        return err
      })

    if (!response.jwt) {
      return response
    }

    commit('SET_TOKEN', response.jwt)
    console.log('Good!', response)
    return response
  },
}
