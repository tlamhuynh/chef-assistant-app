import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { AppContext } from '../context/AppContext';

export default function HomeScreen() {
  const { knowledgeBase, subagents, plugins } = useContext(AppContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Hoạt động gần đây</Title>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph>Bạn có {subagents.length} tác vụ tự động đang chạy.</Paragraph>
            <Paragraph>Kho kiến thức có {knowledgeBase.length} ghi chú.</Paragraph>
            {plugins.length > 0 && <Paragraph>Đã cài đặt {plugins.length} plugin bổ sung.</Paragraph>}
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Tác vụ tự động (Subagents)</Title>
        {subagents.slice(0, 2).map((agent) => (
          <Card key={agent.id} style={styles.itemCard}>
            <Card.Content>
              <Text style={styles.itemTitle}>{agent.name}</Text>
              <Text style={{ color: agent.status === 'Running' ? 'green' : 'gray' }}>{agent.status}</Text>
              <Paragraph style={styles.itemDesc}>{agent.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Kiến thức mới</Title>
        {knowledgeBase.slice(0, 2).map((item) => (
          <Card key={item.id} style={styles.itemCard}>
            <Card.Content>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Paragraph style={styles.itemDesc}>{item.content}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, marginBottom: 8 },
  card: { elevation: 2, backgroundColor: 'white' },
  itemCard: { marginBottom: 8, elevation: 1, backgroundColor: 'white' },
  itemTitle: { fontWeight: 'bold', fontSize: 16 },
  itemDesc: { marginTop: 4, color: '#555' }
});
