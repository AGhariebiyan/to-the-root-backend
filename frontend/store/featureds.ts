import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Featured } from '~/utils/types'
import qs from 'qs'

const initFeaturedArticles: Featured[] = []
const initFeaturedArticleIds: number[] = []

export const state = () => ({
    featuredArticles: initFeaturedArticles,
    featuredArticleIds: initFeaturedArticleIds,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    featuredArticles: (state) => state.featuredArticles,
}

export const mutations: MutationTree<RootState> = {
    ADD_ARTICLES: (state, newArticles: Featured[]) => {
        const filteredNewArticles = newArticles.filter(
            (article) => !state.featuredArticleIds.includes(article.id),
        )
        state.featuredArticles = [...state.featuredArticles, ...filteredNewArticles]
    },

    SET_ARTICLE_IDS: (state, newArticles: Featured[]) => {
        const newIds = new Set(newArticles.map((article) => article.id))
        state.featuredArticleIds = Array.from(new Set([...state.featuredArticleIds, ...newIds]))
    },
}

export const actions: ActionTree<RootState, RootState> = {
    async fetchFeaturedArticles({ commit }, { limit = 3, offset = 0, sort, params = {} }) {
        const paramString = qs.stringify(params)

        const response = await $axios.get(
            `/featureds?_start=${offset.value}&_limit=${limit}${sort ? '&_sort=' + sort : ''}${paramString ? '&' + paramString : ''
            }`,
        )
        const featuredArticles: Featured[] = response.data

        commit('ADD_ARTICLES', featuredArticles)
        commit('SET_ARTICLE_IDS', featuredArticles)
        return featuredArticles
    },
}
