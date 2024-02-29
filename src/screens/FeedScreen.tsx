import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import ImageListItem from '../components/ImageListItem';
import useColumnsButton from '../hooks/useColumnsButton';
import {LIMIT} from '../api/getPhotos';
import type {RootStackParamList} from '../Navigation';
import {useRootStore} from '../store/RootStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Feed'>;

const composeButtons =
  (...buttons: (() => React.JSX.Element)[]) =>
  () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {buttons.map((Button, index) => (
          <Button key={`headButton${index}`} />
        ))}
      </View>
    );
  };

const FeedScreen = observer(({navigation}: Props): React.JSX.Element => {
  const [columns, GridButton] = useColumnsButton();
  const {filteredPhotosList, setFilter, isLoading, fetchMore, loadPhotos} =
    useRootStore().photosStore;

  useEffect(() => {
    navigation.setOptions({
      headerRight: composeButtons(GridButton),
      headerSearchBarOptions: {
        placeholder: 'Type keywords',
        onChangeText: e => setFilter(e.nativeEvent.text),
      },
    });
  }, [navigation, GridButton, setFilter]);
  return (
    <FlatList
      key={`fl${columns}`}
      data={filteredPhotosList}
      numColumns={columns}
      refreshing={isLoading}
      renderItem={item => (
        <ImageListItem
          {...item}
          columns={columns}
          showInfo={id => navigation.navigate('ImageInfo', {photoId: id})}
        />
      )}
      onEndReached={() => {
        fetchMore(LIMIT * columns);
      }}
      onEndReachedThreshold={1}
      onRefresh={() => loadPhotos()}
    />
  );
});

export default FeedScreen;
