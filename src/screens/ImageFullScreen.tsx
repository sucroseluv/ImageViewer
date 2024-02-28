import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  ActivityIndicator,
  useAnimatedValue,
} from 'react-native';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
// import {Zoom} from 'react-native-reanimated-zoom';
import Zoom from 'react-native-zoom-reanimated';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import type {RootStackParamList} from '../Navigation';

const screen = Dimensions.get('screen');

const MAX_ZOOM = 7;
const MAX_TAPS = 2;

type Props = NativeStackScreenProps<RootStackParamList, 'ImageFull'>;
const ImageFullScreen = ({route}: Props): React.JSX.Element => {
  const {url} = route.params;
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        savedScale.value = 1;
        scale.value = withTiming(1);
      } else if (scale.value > MAX_ZOOM) {
        savedScale.value = MAX_ZOOM;
        scale.value = withTiming(MAX_ZOOM);
      } else savedScale.value = scale.value;
    });

  const tapGesture = Gesture.Tap()
    .maxDuration(200)
    .numberOfTaps(2)
    .onStart(() => {
      let zoom = scale.value + (MAX_ZOOM - 1) / MAX_TAPS;
      if (scale.value >= MAX_ZOOM) zoom = 1;
      savedScale.value = zoom;
      scale.value = withTiming(zoom);
    });

  const END_POSITION = 200;
  const onLeft = useSharedValue(true);
  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      // console.log(e);
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;

      console.log(
        `[${scale.value}, ${translateX.value}, ${translateY.value} \t=>[${
          translateX.value * scale.value
        }, ${translateY.value * scale.value}]`,
      );
      // if (onLeft.value) {
      //   translateX.value = e.translationX;
      // } else {
      //   translateX.value = END_POSITION + e.translationX;
      // }
    })
    .onEnd(e => {
      savedTranslateX.value += e.translationX;
      savedTranslateY.value += e.translationY;

      console.log(
        `[${scale.value}, ${translateX.value}, ${translateY.value} \t=>[${
          translateX.value * scale.value
        }, ${translateY.value * scale.value}]`,
      );
      // if (translateX.value > END_POSITION / 2) {
      //   translateX.value = withTiming(END_POSITION, {duration: 100});
      //   onLeft.value = false;
      // } else {
      //   translateX.value = withTiming(0, {duration: 100});
      //   onLeft.value = true;
      // }
    });
  useEffect(() => {}, [scale.value, translateX.value, translateY.value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));

  const [ratio, setRatio] = useState<number>(1);
  Image.getSize(url, (width, height) => {
    setRatio(width / height);
  });

  return (
    // <GestureDetector
    //   gesture={Gesture.Simultaneous(pinchGesture, tapGesture, panGesture)}>
    //   <Animated.View style={[styles.container, animatedStyle]}>
    //     <Image
    //       source={{uri: url}}
    //       resizeMode={'contain'}
    //       style={[styles.image]}
    //     />
    //   </Animated.View>
    // </GestureDetector>
    <Zoom>
      <Image
        source={{uri: url}}
        resizeMode={'contain'}
        style={[styles.image, {aspectRatio: ratio}]}
      />
    </Zoom>
  );
};
const styles = StyleSheet.create({
  image: {
    width: screen.width,
  },
});

export default ImageFullScreen;
