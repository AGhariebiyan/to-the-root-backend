import { $axios } from '~/utils/api'
import { GetterTree, ActionTree, MutationTree } from 'vuex'


export const state = () => ({
  articles: [] = [],
  name: 'Me',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: state => state.name,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchThings({ commit }) {
    const things = await $axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
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
