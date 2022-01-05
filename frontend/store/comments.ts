import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Comment } from '~/utils/types'
import qs from 'qs'

const initComments: Comment[] = []

export const state = () => ({
    comments: initComments,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    comments: (state) => state.comments,
}

export const mutations: MutationTree<RootState> = {
    SET_COMMENTS: (state, newComments: Comment[]) =>
        (state.comments = newComments),

    ADD_COMMENT: (state, newComment: Comment) => {
        state.comments.push(newComment)
    },
}

export const actions: ActionTree<RootState, RootState> = {
    async fetchComments({ commit }, { limit = 6, offset = 0, params = {} }) {
        const paramString = qs.stringify(params)

        const response = await $axios.get(
            `/comments?_start=${offset.value}&_limit=${limit}${paramString ? '&' + paramString : ''
            }`,
        )
        const comments: Comment[] = response.data

        commit('SET_COMMENTS', comments)
        return comments
    },

    async fetchCommentsByArticle({ commit }, articleId) {
        const response = await $axios.get(`/comments?article=${articleId}`)

        const comments: Comment[] = response.data

        commit('SET_COMMENTS', comments)
        return comments
    },
}
