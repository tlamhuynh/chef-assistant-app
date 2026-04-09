import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([
    { id: 1, role: 'assistant', text: 'Chào Chef! Tôi là trợ lý của bạn. Hôm nay bạn cần hỗ trợ gì?' }
  ]);
  const [knowledgeBase, setKnowledgeBase] = useState([
    { id: 1, title: 'Nhiệt độ Sous Vide cho thịt bò', content: 'Medium rare: 54°C (130°F) trong 1-2 tiếng.' },
    { id: 2, title: 'Mẹo giữ rau xanh', content: 'Chần qua nước sôi rồi ngâm ngay vào nước đá.' }
  ]);
  const [subagents, setSubagents] = useState([
    { id: 1, name: 'Theo dõi giá nguyên liệu', status: 'Running', description: 'Cập nhật giá nấm truffles hàng ngày' }
  ]);
  const [plugins, setPlugins] = useState([]);

  const addMessage = (message) => setChatHistory((prev) => [...prev, message]);
  const addKnowledge = (item) => setKnowledgeBase((prev) => [item, ...prev]);
  const addSubagent = (agent) => setSubagents((prev) => [agent, ...prev]);
  const addPlugin = (plugin) => setPlugins((prev) => [plugin, ...prev]);

  const updateSubagentStatus = (agentData) => {
    setSubagents((prev) => {
      const exists = prev.find(a => a.id === agentData.id);
      if (exists) {
        return prev.map(a => a.id === agentData.id ? { ...a, ...agentData } : a);
      }
      return [agentData, ...prev];
    });
  };

  return (
    <AppContext.Provider value={{
      chatHistory, addMessage,
      knowledgeBase, addKnowledge,
      subagents, addSubagent, updateSubagentStatus,
      plugins, addPlugin
    }}>
      {children}
    </AppContext.Provider>
  );
};
