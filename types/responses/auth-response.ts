import type { SuccesMessage } from '..'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

export type ApiLoginResponse = SuccesMessage<LoginResponse>
