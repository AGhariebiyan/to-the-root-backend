import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Author } from '~/utils/types'

const initAuthors: Author[] = []

export const state = () => ({
  authors: initAuthors,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  authors: (state) => state.authors,
}

export const mutations: MutationTree<RootState> = {
  ADD_AUTHOR: (state, newAuthor: Author) => {
    state.authors.push(newAuthor)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchAuthorById({ commit }, id) {
    const response = await $axios.get(`/authors/${id}`)

    const author: Author = response.data

    commit('ADD_AUTHOR', author)
    return author
  },
}
