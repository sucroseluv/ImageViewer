import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedScreen from './screens/FeedScreen';
import ImageInfoScreen from './screens/ImageInfoScreen';
import ImageFullScreen from './screens/ImageFullScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Feed: undefined;
  ImageInfo: {photoId: number};
  ImageFull: {url: string};
};

const Navigation = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Feed'} component={FeedScreen} />
        <Stack.Screen
          name={'ImageInfo'}
          component={ImageInfoScreen}
          options={{title: 'Image'}}
        />
        <Stack.Screen
          name={'ImageFull'}
          component={ImageFullScreen}
          options={{
            headerTransparent: true,
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
