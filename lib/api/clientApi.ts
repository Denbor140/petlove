import { User, UserFull } from "@/types/user";
import { api } from "./api";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  password: string;
  token: string;
}

export const register = async (data: RegisterRequest) => {
  const res = await api.post<AuthResponse>("/users/signup", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<AuthResponse>("/users/signin", data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get<User>("/users/current");
  return res.data;
};

export const getCurrentUserFull = async () => {
  const res = await api.get<UserFull>("/users/current/full");
  return res.data;
};

export const signOut = async () => {
  await api.post("/users/signout");
};
