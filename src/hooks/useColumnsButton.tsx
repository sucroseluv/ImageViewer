import React, {useCallback} from 'react';
import {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import gridIcon from '../icons/grid.png';

const MAX_COLUMNS = 4;
const useColumnsButton = (): [number, () => React.JSX.Element] => {
  const [columns, setColumns] = useState<number>(1);
  const headerRight = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => setColumns(c => (c === MAX_COLUMNS ? 1 : c + 1))}>
        <Image source={gridIcon} style={styles.image} />
      </TouchableOpacity>
    ),
    [],
  );

  return [columns, headerRight];
};

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});

export default useColumnsButton;
