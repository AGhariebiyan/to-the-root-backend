import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Article } from '~/utils/types'

const initArticles: Article[] = []
const initIds: number[] = []

export const state = () => ({
  articles: initArticles,
  ids: initIds,
  foundAllArticles: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  articles: (state) => state.articles,
  foundAllArticles: (state) => state.foundAllArticles,
}

export const mutations: MutationTree<RootState> = {
  ADD_ARTICLES: (state, newArticles: Article[]) => {
    const filteredNewArticles = newArticles.filter(
      (article) => !state.ids.includes(article.id),
    )
    if (filteredNewArticles.length === 0) {
      state.foundAllArticles = true
    }
    state.articles = [...state.articles, ...filteredNewArticles]
  },

  SET_ARTICLE_IDS: (state, newArticles: Article[]) => {
    const newIds = new Set(newArticles.map((article) => article.id))
    state.ids = Array.from(new Set([...state.ids, ...newIds]))
  },

  SET_ARTICLES: (state, newArticles: Article[]) =>
    (state.articles = newArticles),

  ADD_ARTICLE: (state, newArticle: Article) => {
    state.articles.push(newArticle)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchArticles({ commit }, { limit, offset }) {
    const response = await $axios.get(
      `/articles?_start=${offset.value}&_limit=${limit}`,
    )
    const articles = response.data
    commit('ADD_ARTICLES', articles)
    commit('SET_ARTICLE_IDS', articles)
    return articles
  },
}
