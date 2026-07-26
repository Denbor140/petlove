import { User, UserFull } from "@/types/user";
import { api } from "./api";
import { News } from "@/types/news";
import { Friends } from "@/types/friends";
import { Notice } from "@/types/notice";
import { City } from "@/types/city";

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
  keyword?: string;
  page: number;
  limit: number;
}

export interface GetNewsResponse {
  results: News[];
  totalPages: number;
}

export interface GetNoticesParams {
  keyword?: string;
  category?: string;
  gender?: string;
  species?: string;
  locationId?: string;
  page: number;
  limit: number;
}

export interface GetNoticesResponse {
  results: Notice[];
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

export const getNews = async ({ keyword, page, limit }: GetNewsParams) => {
  const res = await api.get<GetNewsResponse>("/news", {
    params: { ...(keyword ? { keyword } : {}), page, limit },
  });
  return res.data;
};

export const getFriends = async () => {
  const res = await api.get<Friends[]>("/friends");
  return res.data;
};

export const getNotices = async ({
  keyword,
  category,
  gender,
  species,
  locationId,
  page,
  limit,
}: GetNoticesParams) => {
  const res = await api.get<GetNoticesResponse>("/notices", {
    params: {
      ...(keyword ? { keyword } : {}),
      ...(category ? { category } : {}),
      ...(gender ? { sex: gender } : {}),
      ...(species ? { species } : {}),
      ...(locationId ? { locationId } : {}),
      page,
      limit,
    },
  });
  return res.data;
};

export const getNoticesCategories = async () => {
  const res = await api.get<string[]>("/notices/categories");
  return res.data;
};

export const getNoticesGender = async () => {
  const res = await api.get<string[]>("/notices/sex");
  return res.data;
};

export const getNoticesSpecies = async () => {
  const res = await api.get<string[]>("/notices/species");
  return res.data;
};

export const getCities = async (keyword: string): Promise<City[]> => {
  const res = await api.get<City[]>("/cities/", {
    params: { keyword },
  });
  return res.data;
};
