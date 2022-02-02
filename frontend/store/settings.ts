import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  allowsGoogleAnalytics: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  allowsGoogleAnalytics: (state) => state.allowsGoogleAnalytics,
}

export const mutations: MutationTree<RootState> = {
  SET_ALLOWS_GOOGLE_ANALYTICS: (state, allowsGA: boolean) => {
    state.allowsGoogleAnalytics = allowsGA
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async setAllowsGoogleAnalytics({ commit }, allowsGA) {
    commit('SET_ALLOWS_GOOGLE_ANALYTICS', allowsGA)
    const response = await $axios.get(``)
  },
}
