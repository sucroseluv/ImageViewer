import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../Navigation';
import {Photo, User} from '../types';
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';
import PhotoInfo from '../components/PhotoInfo';
import {useRootStore} from '../store/RootStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageInfo'>;

const ImageInfoScreen = ({route, navigation}: Props): React.JSX.Element => {
  const {photoId} = route.params;
  const {getPhotoById} = useRootStore().photosStore;
  const {getUserById} = useRootStore().userStore;

  const [photo, setPhoto] = useState<Photo>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!photoId) {
      throw new Error("ImageInfoScreen hasn't fetched photoId");
    }
    getPhotoById(photoId).then(photo => {
      setPhoto(photo);
      getUserById(photo.id).then(user => {
        setUser(user);
      });
    });
  }, [getPhotoById, getUserById, photoId]);

  return photo ? (
    <ScrollView>
      <PhotoInfo photo={photo} navigation={navigation} />
      {user ? <UserCard user={user} navigation={navigation} /> : <Loading />}
    </ScrollView>
  ) : (
    <Loading />
  );
};

export default ImageInfoScreen;
