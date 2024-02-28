import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import type {RootStackParamList} from '../Navigation';
import {User} from '../types';

import type {PropsWithChildren} from 'react';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = PropsWithChildren<{
  navigation: NativeStackNavigationProp<RootStackParamList>;
  user: User;
}>;

const UserCard: (props: Props) => React.JSX.Element = ({user, navigation}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ImageFull', {url: user.profile_picture})
        }>
        <Image
          source={{uri: user.profile_picture}}
          style={styles.profilePicture}
        />
      </TouchableOpacity>
      <View style={styles.text}>
        <View style={styles.row}>
          <Text style={styles.name}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={styles.smallText}>{user.country}</Text>
        </View>
        <Text style={styles.smallText}>Email: {user.email}</Text>
        <Text style={styles.smallText}>Phone: {user.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  text: {flex: 1, paddingHorizontal: 5},
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  name: {fontSize: 16, color: 'black', flex: 1},
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignSelf: 'center',
  },
  smallText: {fontSize: 12},
});

export default UserCard;
