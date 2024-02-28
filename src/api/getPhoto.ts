import {ResponsePhoto} from '../types';

const getPhotos = async (id: number): Promise<ResponsePhoto> => {
  return await fetch(
    `https://api.slingacademy.com/v1/sample-data/photos/${id}`,
  ).then(res => res.json());
};

export default getPhotos;
