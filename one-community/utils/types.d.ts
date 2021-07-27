export interface Category {
  name: string
}

export interface Article {
  author: string
  categories: Category[]
  content: string
  id: number
}
