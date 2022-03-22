import { shallowMount, Wrapper } from '@vue/test-utils'
import ArticleCard from './ArticleCard.vue'
import { Article, Category } from '~/utils/types'

let wrapper: Wrapper<Vue, Element>

const category: Category = {
  name: 'a',
  created_at: '',
  id: 0,
  published_at: '',
  slug: '',
  updated_at: '',
}

const article: Article = {
  title: 'Test',
  author: 'John Doe',
  categories: [category],
  comments: [],
  likes: [],
  content: '',
  cover_image: {},
  created_at: '',
  description: '',
  id: 0,
  original_date: '',
  published_at: '',
  slug: '',
  updated_at: '',
}

afterEach(() => {
  wrapper.destroy()
})

describe('Article card', () => {
  beforeEach(() => {
    wrapper = shallowMount(ArticleCard, {
      propsData: { article },
      stubs: {
        NuxtLink: true,
      },
      mocks: {
        $nuxt: {
          context: {
            $config: { strapiUrl: 'http://127.0.0.1' },
          },
        },
      },
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('shows the article title', () => {
    expect(wrapper.find('.article__title').element.textContent).toBe(
      article.title,
    )
  })
})
