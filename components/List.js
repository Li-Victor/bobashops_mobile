import * as React from 'react';
import { ScrollView, Text } from 'react-native';

type Props = {
  nearbyStores: Array<{
    id: string,
    name: string
  }>
};

const List = ({ nearbyStores }: Props) => (
  <ScrollView>
    {nearbyStores.map(store => <Text key={store.id}>{store.name}</Text>)}
  </ScrollView>
);

export default List;
