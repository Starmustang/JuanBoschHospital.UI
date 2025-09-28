export interface registerType {
  title?: string;
  subtitle?: any | any[];
  subtext?: any | any[];
}

export interface loginType {
  title?: string;
  subtitle?: any | any[];
  subtext?: any | any[];
}

export interface signInType {
  title?: string;
}

// Login request and response types
export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
  refreshToken?: string;
  expiresIn?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}
