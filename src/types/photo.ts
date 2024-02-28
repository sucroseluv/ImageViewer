import {Response} from './response';
import {Pagination} from './pagination';

export type Photo = {
  id: number;
  user: number;
  title: string;
  description: string;
  url: string;
};

export type ResponsePhotos = Response & {
  pagination: Pagination;
  photos: Photo[];
};
export type ResponsePhoto = Response & {photo: Photo};
