import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Paragraph, Text, IconButton } from 'react-native-paper';
import { AppContext } from '../context/AppContext';

export default function TasksScreen() {
  const { subagents } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title 
        title={item.name} 
        subtitle={<Text style={{ color: item.status === 'Running' ? 'green' : 'gray' }}>{item.status}</Text>}
        right={(props) => <IconButton {...props} icon={item.status === 'Running' ? 'stop-circle-outline' : 'play-circle-outline'} onPress={() => {}} />}
      />
      <Card.Content>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={subagents}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { padding: 16 },
  card: { elevation: 1, backgroundColor: 'white' }
});
