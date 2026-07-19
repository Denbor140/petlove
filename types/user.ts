import { Notice } from "./notice";
import { Pet } from "./pet";

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  noticesFavorites: Notice[];
}

export interface UserFull extends User {
  avatar: string;
  phone: string;
  noticesViewed: Notice[];
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
}
