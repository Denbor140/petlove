import { User, UserFull } from "@/types/user";
import { api } from "./api";
import { News } from "@/types/news";
import { Friends } from "@/types/friends";
import { Notice } from "@/types/notice";
import { City } from "@/types/city";
import { FilterValue } from "@/components/FilterButtons/FilterButtons";

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

const FILTER_TO_PARAMS: Record<
  FilterValue,
  { byPrice?: boolean; byPopularity?: boolean }
> = {
  cheap: { byPrice: true },
  expensive: { byPrice: false },
  popular: { byPopularity: true },
  unpopular: { byPopularity: false },
};

export interface GetNoticesParams {
  keyword?: string;
  category?: string;
  gender?: string;
  species?: string;
  locationId?: string;
  sortFilter?: FilterValue | null;
  page: number;
  limit: number;
}

export interface GetNoticesResponse {
  results: Notice[];
  totalPages: number;
}

interface EditUserData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

interface AddPetData {
  title: string;
  name: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
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
  sortFilter,
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
      ...(sortFilter ? FILTER_TO_PARAMS[sortFilter] : {}),
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

export const getCitiesLocations = async (): Promise<City[]> => {
  const res = await api.get<City[]>("/cities/locations");
  return res.data;
};

export const getNoticesById = async (id: string) => {
  const res = await api.get<Notice>(`/notices/${id}`);
  return res.data;
};

export const addNoticesToFavorites = async (id: string) => {
  const res = await api.post(`/notices/favorites/add/${id}`);
  return res.data;
};

export const removeNoticesFromFavorites = async (id: string) => {
  const res = await api.delete(`/notices/favorites/remove/${id}`);
  return res.data;
};

export const editUser = async (data: EditUserData): Promise<UserFull> => {
  const editUserData = {
    ...(data.name ? { name: data.name } : {}),
    ...(data.email ? { email: data.email } : {}),
    ...(data.phone ? { phone: data.phone } : {}),
    ...(data.avatar ? { avatar: data.avatar } : {}),
  };
  const res = await api.patch<UserFull>("/users/current/edit", editUserData);
  return res.data;
};

export const addPet = async (data: AddPetData): Promise<UserFull> => {
  const res = await api.post<UserFull>("/users/current/pets/add", data);
  return res.data;
};

export const deletePet = async (id: string) => {
  const res = await api.delete(`/users/current/pets/remove/${id}`);
  return res.data;
};
