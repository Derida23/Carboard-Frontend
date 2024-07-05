interface AuthEndpoints {
  LOGIN: string;
}

interface UserEndpoints {
  ME: string;
}
export interface ApiEndpoints {
  AUTH: AuthEndpoints;
  USER: UserEndpoints;
}
