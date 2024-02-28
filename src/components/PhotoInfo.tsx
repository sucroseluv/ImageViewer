import React, {PropsWithChildren} from 'react';
import {Image, Text, View, Pressable, StyleSheet} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../Navigation';
import {Photo} from '../types';

type Props = PropsWithChildren<{
  navigation: NativeStackNavigationProp<RootStackParamList>;
  photo: Photo;
}>;

const PhotoInfo = ({photo, navigation}: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate('ImageFull', {url: photo.url})}>
        <Image source={{uri: photo.url}} style={styles.image} />
      </Pressable>
      <View style={{padding: 10}}>
        <Text style={styles.title}>{photo.title}</Text>
        <Text>{photo.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {fontSize: 24, color: 'black'},
});

export default PhotoInfo;
