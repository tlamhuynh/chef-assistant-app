import React, { useState, useContext, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { TextInput, IconButton, Text, Surface } from 'react-native-paper';
import { AppContext } from '../context/AppContext';
import { mockNotebookLLMAnalyze } from '../services/llmService';
import { ResearchAgent } from '../services/researchAgent';

export default function ChatScreen() {
  const { chatHistory, addMessage, addKnowledge, addSubagent, updateSubagentStatus, addPlugin } = useContext(AppContext);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef();

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), role: 'user', text: inputText };
    addMessage(userMessage);
    const userInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      const analysis = await mockNotebookLLMAnalyze(userInput);
      
      if (analysis.intent === 'start_research') {
        const agent = new ResearchAgent(
          analysis.extractedData.topic,
          (progressData) => {
            updateSubagentStatus(progressData);
          },
          (refinedKnowledge) => {
             const knowledgeEntry = {
                id: Date.now(),
                title: refinedKnowledge.title,
                content: refinedKnowledge.content
             };
             addKnowledge(knowledgeEntry);
             addMessage({ id: Date.now() + 2, role: 'assistant', text: `Nghiên cứu về "${analysis.extractedData.topic}" đã hoàn tất và được lưu vào Kho kiến thức.`});
          }
        );
        agent.start();
      } else if (analysis.intent === 'save_knowledge') {
        addKnowledge({ id: Date.now(), title: 'Ghi chú tự động', content: analysis.extractedData.content });
      } else if (analysis.intent === 'create_monitor_agent') {
        addSubagent({ id: Date.now(), name: 'Tác vụ ngầm', status: 'Running', description: analysis.extractedData.task });
      } else if (analysis.intent === 'generate_plugin') {
        addPlugin({ id: Date.now(), name: analysis.extractedData.featureName, active: true });
      }

      addMessage({ id: Date.now() + 1, role: 'assistant', text: analysis.responseText });
    } catch (error) {
      addMessage({ id: Date.now() + 1, role: 'assistant', text: "Đã có lỗi xảy ra khi kết nối hệ thống LLM." });
    } finally {
      setIsTyping(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageRow, item.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant]}>
      <Surface style={[styles.bubble, item.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant]}>
        <Text style={{ color: item.role === 'user' ? 'white' : 'black' }}>{item.text}</Text>
      </Surface>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={chatHistory}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />
      {isTyping && <ActivityIndicator style={{padding: 10}}/>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Yêu cầu trợ lý, lưu trữ, hoặc tạo tác vụ..."
          value={inputText}
          onChangeText={setInputText}
          mode="outlined"
          right={<TextInput.Icon icon="send" onPress={handleSend} />}
          onSubmitEditing={handleSend}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listContainer: { padding: 16, flexGrow: 1, justifyContent: 'flex-end' },
  messageRow: { marginBottom: 12, flexDirection: 'row' },
  messageRowUser: { justifyContent: 'flex-end' },
  messageRowAssistant: { justifyContent: 'flex-start' },
  bubble: { padding: 12, borderRadius: 16, maxWidth: '80%', elevation: 1 },
  bubbleUser: { backgroundColor: '#007AFF', borderBottomRightRadius: 4 },
  bubbleAssistant: { backgroundColor: '#f0f0f0', borderBottomLeftRadius: 4 },
  inputContainer: { padding: 8, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: 'white' },
  input: { backgroundColor: 'white' }
});
