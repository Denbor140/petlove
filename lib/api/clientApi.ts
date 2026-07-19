import { User, UserFull } from "@/types/user";
import { api } from "./api";
import { News } from "@/types/news";

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

interface GetNewsParams {
  page: number;
  perPage: number;
}

export interface GetNewsResponse {
  results: News[];
  totalPages: number;
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

export const getNews = async ({ page, perPage }: GetNewsParams) => {
  const res = await api.get<GetNewsResponse>("/news", {
    params: { page, perPage },
  });
  return res.data;
};
