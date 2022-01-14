import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Like } from '~/utils/types'

const initLikes: Like[] = []
var initLikeFromUser: Like

export const state = () => ({
    likes: initLikes,
    likeFromUser: initLikeFromUser,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    likes: (state) => state.likes,
    likeFromUser: (state) => state.likeFromUser,
}

export const mutations: MutationTree<RootState> = {
    SET_LIKES: (state, newLikes: Like[]) => {
        state.likes = newLikes
    },

    SET_LIKE_FROM_USER: (state, likeFromUser: Like) => {
        state.likeFromUser = likeFromUser
    },

    ADD_LIKE: (state, newLike: Like) => {
        state.likes.push(newLike)
    },

    REMOVE_LIKE: (state, likeToRemove: Like) => {
        const like = state.likes.find(l => l.id === likeToRemove.id)

        if (like) {
            const index = state.likes.indexOf(like)
            state.likes.splice(index, 1)
        }

        state.likeFromUser = initLikeFromUser
    },

    REMOVE_LIKE_FROM_USER: (state) => {
        state.likeFromUser = initLikeFromUser
    }
}

export const actions: ActionTree<RootState, RootState> = {
    async fetchLikesByArticle({ commit }, articleId) {
        const response = await $axios.get(`/likes?article=${articleId}`)

        const likes: Like[] = response.data

        commit('SET_LIKES', likes)
        return likes
    },

    async fetchLikeFromUser({ commit }, userId) {
        const response = await $axios.get(`/likes?user=${userId}`)

        const likeFromUser: Like = response.data[0]

        commit('SET_LIKE_FROM_USER', likeFromUser)
        return likeFromUser
    },

    async addLike({ commit }, { userId, articleId }) {
        const response = await $axios
            .post(`/articles/${articleId}/like`, {
                user: userId,
            })

        const like: Like = response.data

        commit('ADD_LIKE', like)
        commit('SET_LIKE_FROM_USER', like)
        return like
    },

    async removeLike({ commit }, { like }) {
        const response = await $axios
            .delete(`/likes/${like.id}`)

        commit('REMOVE_LIKE', like)
        return response.data
    },

    async removeLikeFromUser({ commit }) {
        commit('REMOVE_LIKE_FROM_USER')
    }
}
