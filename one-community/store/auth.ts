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
  SET_TOKEN: (state, token: string) => (state.token = token),
}

export const actions: ActionTree<RootState, RootState> = {
  async registerUser({ commit }, { username, email, password }) {
    const response = await $axios.$post(`/auth/local/register`, {
      username,
      email,
      password,
    })

    if (!response.ok) {
      console.log('Error!', response, response.text())
      return response
    }

    commit('SET_TOKEN', response.jwt)
    console.log('Good!', response, response.text())
    return response
  },
}
