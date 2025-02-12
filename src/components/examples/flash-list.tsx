import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
  ExamplesListScreenName,
  ExamplesListStackParamList,
} from '../../types/navigation';
import FastImage from 'react-native-fast-image';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const screenArray = Object.values(ExamplesListScreenName);

type ListItemProps = {
  title: ExamplesListScreenName;
  index: number;
};

const DATA: Array<ListItemProps> = Array.from({ length: 300 }).map(
  (_item, index) => ({
    title: screenArray[index % screenArray.length],
    index,
  }),
);

const ListItem = ({ title, index }: ListItemProps) => {
  const navigation =
    useNavigation<NavigationProp<ExamplesListStackParamList>>();
  return (
    <Pressable
      key={title + index}
      style={styles.item}
      onPress={() => navigation.navigate(title)}>
      <FastImage
        style={styles.img}
        source={{
          uri: `https://unsplash.it/400/400?image=${index}`,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const FlashListExample = () => {
  return (
    <View style={styles.con}>
      <FlashList
        contentContainerStyle={styles.listCon}
        data={DATA}
        keyExtractor={item => item.title + item.index}
        renderItem={({ item }) => (
          <ListItem
            key={item.title + item.index}
            title={item.title}
            index={item.index}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  con: { flex: 1, width: '100%' },
  listCon: { padding: 8 },
  item: {
    backgroundColor: 'lightblue',
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    textAlign: 'right',
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
});

export default FlashListExample;
