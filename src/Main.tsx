import React from 'react';
import Navigation from './Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootStoreContext, rootStore} from './store/RootStore';

const Main = (): React.JSX.Element => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RootStoreContext.Provider value={rootStore}>
        <Navigation />
      </RootStoreContext.Provider>
    </GestureHandlerRootView>
  );
};

export default Main;
