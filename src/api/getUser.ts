import {ResponseUser} from '../types';

const getUser = async (id: number): Promise<ResponseUser> => {
  return await fetch(
    `https://api.slingacademy.com/v1/sample-data/users/${id}`,
  ).then(res => res.json());
};

export default getUser;
