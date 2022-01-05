export interface Category {
  created_at: string
  id: number
  name: string
  published_at: string
  slug: string
  updated_at: string
}

export interface Article {
  author: string
  categories: Category[]
  comments: Comment[]
  content: string
  cover_image: {}
  created_at: string
  description: string
  id: number
  original_date: string
  published_at: string
  slug: string
  title: string
  updated_at: string
}

export interface Comment {
  content: string
  author: string
  article: Article
  created_at: string
  updated_at: string
}

type ErrorResponse = { message: any[] }
