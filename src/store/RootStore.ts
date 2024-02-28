import React from 'react';
import PhotosStore from './PhotosStore';
import UserStore from './UserStore';

class RootStore {
  photosStore;
  userStore;

  constructor() {
    this.photosStore = PhotosStore;
    this.userStore = UserStore;
  }
}

export const rootStore = new RootStore();

export const RootStoreContext = React.createContext(rootStore);
export const useRootStore = () => React.useContext(RootStoreContext);
