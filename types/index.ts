export interface ErrorMessage {
  error: string
  message: string
  statusCode: number
}

export interface ErrorResponse {
  body: ErrorMessage
  status: number
}

export interface Notification {
  status: 'warning' | 'error' | 'success';
  title: string;
  description: string;
}