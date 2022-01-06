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

export interface Author {
  id: number
  name: string
  photo: {}
  email: string
  github: string
  twitter: string
  linkedIn: string
  biography: string
  created_at: string
  published_at: string
  updated_at: string
}

type ErrorResponse = { message: any[] }
