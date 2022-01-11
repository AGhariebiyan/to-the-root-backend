import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Comment } from '~/utils/types'

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
    async fetchCommentsByArticle({ commit }, articleId) {
        const response = await $axios.get(`/comments?article=${articleId}`)

        const comments: Comment[] = response.data

        commit('SET_COMMENTS', comments)
        return comments
    },

    async addComment({ commit }, { articleId, userId, commentText }) {
        const response = await $axios
            .post(`/articles/${articleId}/comment`, {
                user: userId,
                content: commentText,
            })

        const comment: Comment = response.data

        commit('ADD_COMMENT', comment)
        return comment
    }
}
