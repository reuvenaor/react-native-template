import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
  ExamplesListScreenName,
  ExamplesListStackParamList,
} from '../../types/navigation';
import FastImage from 'react-native-fast-image';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { List, Divider } from 'react-native-paper';

const screenArray = Object.values(ExamplesListScreenName).filter(
  screen => screen !== ExamplesListScreenName.ExamplesList
);

type IconProps = { color: string; style?: any };

type ListItemProps = {
  title: ExamplesListScreenName;
  index: number;
};

const DATA: Array<ListItemProps> = Array.from({ length: 300 }).map(
  (_item, index) => ({
    title: screenArray[index % screenArray.length],
    index,
  })
);

const ListItem = ({ title, index }: ListItemProps) => {
  const navigation =
    useNavigation<NavigationProp<ExamplesListStackParamList>>();

  const left = () => (
    <FastImage
      style={styles.img}
      source={{
        uri: `https://unsplash.it/400/400?image=${index}`,
        headers: { Authorization: 'someAuthToken' },
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
  const right = (props: IconProps) => (
    <List.Icon {...props} icon="chevron-right" />
  );

  return (
    <List.Item
      title={title}
      titleStyle={styles.titleStyle}
      onPress={() => navigation.navigate(title)}
      left={left}
      right={right}
    />
  );
};

const FlashListExample = () => {
  const divider = () => <Divider />;

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
        ItemSeparatorComponent={divider}
        estimatedItemSize={78}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  con: { flex: 1, width: '100%' },
  listCon: { paddingHorizontal: 8 },
  img: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignSelf: 'center',
    marginLeft: 8,
  },
  titleStyle: { color: '#7F7F7F' },
});

export default FlashListExample;
