import {makeAutoObservable, runInAction} from 'mobx';
import getPhotos, {LIMIT} from '../api/getPhotos';
import getPhoto from '../api/getPhoto';
import {Pagination, Photo} from '../types';

export class PhotosStore {
  pagination: Pagination = {offset: 0, total_photos: LIMIT, limit: LIMIT};
  photosList: Photo[] = [];
  filteredPhotosList: Photo[] = [];
  individualPhotos: Photo[] = [];
  isLoading = true;
  filter: string = '';

  constructor() {
    makeAutoObservable(this);
    this.loadPhotos();
  }

  loadPhotos = () =>
    runInAction(() => {
      this.setLoading(true);
      getPhotos()
        .then(response => {
          this.setPagination(response.pagination);
          this.setPhotos(response.photos);
          this.setLoading(false);
        })
        .then(() => this.useFilter());
    });

  fetchMore = (limit: number = LIMIT) =>
    runInAction(() => {
      if (this.pagination.offset >= this.pagination.total_photos) return false;

      this.setLoading(true);
      getPhotos(this.pagination.offset + this.pagination.limit, limit)
        .then(response => {
          this.setPagination(response.pagination);
          this.addPhotos(response.photos);
          this.setLoading(false);
          return response.photos;
        })
        .then(() => this.useFilter())
        .then(photos => {
          if (photos.length < limit && this.filter.length > 0) {
            this.fetchMore(limit - photos.length);
          }
        });
    });

  getPhotoById = async (id: number) =>
    await runInAction(async () => {
      let photo = this.photosList
        .concat(this.individualPhotos)
        .find(photo => photo.id === id);
      if (photo) return photo;
      this.setLoading(true);
      photo = (await getPhoto(id)).photo;
      this.setLoading(false);
      this.addIndividualPhoto(photo);
      return photo;
    });

  useFilter = () => {
    this.filteredPhotosList = this.photosList.filter(
      photo =>
        photo.title.toLowerCase().includes(this.filter) ||
        photo.description.toLowerCase().includes(this.filter),
    );
    return this.filteredPhotosList;
  };

  setFilter = (text: string) => {
    this.filter = text.toLowerCase();
    this.useFilter();
  };

  setPagination = (pagination: Pagination) => (this.pagination = pagination);
  setLoading = (value: boolean) => (this.isLoading = value);
  setPhotos = (photos: Photo[]) => (this.photosList = photos);
  addPhotos = (photos: Photo[]) =>
    this.photosList.push(
      ...photos.filter(p => !this.photosList.some(pp => p.id === pp.id)),
    );
  addIndividualPhoto = (photo: Photo) => this.individualPhotos.push(photo);
}

export default new PhotosStore();
