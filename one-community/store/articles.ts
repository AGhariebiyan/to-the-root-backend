import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface Category {
  name: string
}

interface Article {
  author: string
  categories: Category[]
  content: string
}

const initArticles: Article[] = []

export const state = () => ({
  articles: initArticles,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  articles: (state) => state.articles,
}

export const mutations: MutationTree<RootState> = {
  ADD_ARTICLES: (state, newArticles: []) =>
    (state.articles = [...state.articles, ...newArticles]),

  SET_ARTICLES: (state, newArticles: []) => (state.articles = newArticles),

  ADD_ARTICLE: (state, newArticle: Article) => {
    state.articles.push(newArticle)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchArticles({ commit }, { limit, offset }) {
    const response = await $axios.get(
      `/articles?_start=${offset}&_limit=${limit}`,
    )
    console.log(response)
    const articles = response.data
    commit('SET_ARTICLES', articles)
    return articles
  },
}

// @Module({
//     stateFactory: true,
//     namespaced: true,
// })
// export default class getLearningModule extends VuexModule {
//     articles: [] = []

//     @Mutation
//     public async setArticles(articles: []) {
//         this.articles = articles
//     }

//     @Action({ rawError: true })
//     public async getArticles() {
//         await $axios.$get('<API URL>').then((payload: any) => {
//             this.context.commit('setArticles', payload.data as [])
//         })
//     }

// }
