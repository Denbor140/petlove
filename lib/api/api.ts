import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
});

const PUBLIC_ENDPOINTS = ["/users/signup", "/users/signin"];

api.interceptors.request.use((config) => {
  const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url));

  if (!isPublic) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export type ApiError = AxiosError<{ message: string }>;
