import {ResponsePhotos} from '../types';

export const LIMIT = 20;
const getPhotos = async (
  offset = 0,
  limit = LIMIT,
): Promise<ResponsePhotos> => {
  return await fetch(
    `https://api.slingacademy.com/v1/sample-data/photos?offset=${offset}&limit=${limit}`,
  )
    .then(res => res.json())
    .then(res => {
      const {offset, total_photos, limit, ...rest} = res;
      return {
        ...rest,
        pagination: {offset, total_photos, limit},
      };
    });
};

export default getPhotos;
