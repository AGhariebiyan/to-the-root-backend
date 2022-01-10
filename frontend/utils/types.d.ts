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
  likes: Like[]
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
  user: number
  article: Article
  created_at: string
  updated_at: string
}

export interface Like {
  liked: boolean
  article: Article
  user: string
}

type ErrorResponse = { message: any[] }
