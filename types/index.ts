export interface ApiResponse<T = unknown> {
  body: T
  status: number
}

export interface ErrorMessage {
  error: string
  message: string
  statusCode: number
}

export interface SuccesMessage<T = unknown> {
  data: T
  message: string
  statusCode: number
}

export interface SuccesMessageList<T = unknown> {
  data: T
  meta: {
    total: number
    page: number
    per_page: number
  }
  message: string
  statusCode: number
}

export interface Notification {
  status: 'warning' | 'error' | 'success'
  title: string
  description: string
}
