import React, {useState} from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import Zoom from 'react-native-zoom-reanimated';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageFull'>;
const ImageFullScreen = ({route}: Props): React.JSX.Element => {
  const {url} = route.params;
  const [ratio, setRatio] = useState<number>(1);
  Image.getSize(url, (width, height) => {
    setRatio(width / height);
  });

  return (
    <Zoom>
      <Image
        source={{uri: url}}
        resizeMode={'contain'}
        style={[styles.image, {aspectRatio: ratio}]}
      />
    </Zoom>
  );
};

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  image: {
    width: screen.width,
  },
});

export default ImageFullScreen;
