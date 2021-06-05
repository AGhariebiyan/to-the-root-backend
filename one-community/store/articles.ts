import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

@Module({
    stateFactory: true,
    namespaced: true,
})
export default class getLearningModule extends VuexModule {
    articles: [] = []


    @Mutation
    public async setArticles(articles: []) {
        this.articles = articles
    }


    @Action({ rawError: true })
    public async getArticles() {
        await $axios.$get('<API URL>').then((payload: any) => {
            this.context.commit('setArticles', payload.data as [])
        })
    }

}
