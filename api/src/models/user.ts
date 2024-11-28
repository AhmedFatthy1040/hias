export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}
