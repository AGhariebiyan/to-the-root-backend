import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Like } from '~/utils/types'

const initLikes: Like[] = []

export const state = () => ({
    likes: initLikes,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    likes: (state) => state.likes,
}

export const mutations: MutationTree<RootState> = {
    SET_LIKES: (state, newLikes: Like[]) =>
        (state.likes = newLikes),

    ADD_LIKE: (state, newLike: Like) => {
        state.likes.push(newLike)
    },
}

export const actions: ActionTree<RootState, RootState> = {
    async fetchLikesByArticle({ commit }, articleId) {
        const response = await $axios.get(`/likes?article=${articleId}`)

        const likes: Like[] = response.data

        commit('SET_LIKES', likes)
        return likes
    },

    async addLike({ commit }, { articleId }) {
        const response = await $axios
            .post(`/articles/${articleId}/like`, {
                liked: true,
            })

        const like: Like = response.data

        commit('ADD_LIKE', like)
        return like
    }
}
