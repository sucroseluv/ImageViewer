import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import {Pressable} from 'react-native';
import {Photo} from '../types';
const {width} = Dimensions.get('window');

type Props = PropsWithChildren<{
  showInfo: (photoId: number) => void;
  item: Photo;
  index: number;
  columns: number;
}>;

const GRID_ITEM_MARGIN = 1;
const ListItem = ({
  item,
  index,
  columns,
  showInfo,
}: Props): React.JSX.Element => {
  return (
    <Pressable onPress={() => showInfo(item.id)}>
      <Image
        source={{
          uri: item.url,
        }}
        style={[
          styles.item,
          {
            width: width / columns,
            marginRight: index % columns < columns - 1 ? GRID_ITEM_MARGIN : 0,
          },
        ]}
        resizeMode={'cover'}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    aspectRatio: 1,
    marginBottom: GRID_ITEM_MARGIN,
  },
});

export default ListItem;
