import type { SuccesMessage } from ".."

export interface MeResponse {
  id: number;
  name: string;
  email: string;
  address: string | null;
  avatar: string | null;
  phone_number: string | null;
  role: 'admin' | 'user' 
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export type ApiMeResponse = SuccesMessage<MeResponse>