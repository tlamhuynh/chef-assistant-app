import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import KnowledgeBaseScreen from './screens/KnowledgeBaseScreen';
import TasksScreen from './screens/TasksScreen';
import { AppProvider } from './context/AppContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                else if (route.name === 'Assistant') iconName = focused ? 'robot' : 'robot-outline';
                else if (route.name === 'Knowledge') iconName = focused ? 'book-open-page-variant' : 'book-open-page-variant-outline';
                else if (route.name === 'Tasks') iconName = focused ? 'format-list-checks' : 'format-list-checks';
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#007AFF',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Trang Chủ' }} />
            <Tab.Screen name="Assistant" component={ChatScreen} options={{ title: 'Trợ Lý' }} />
            <Tab.Screen name="Knowledge" component={KnowledgeBaseScreen} options={{ title: 'Kiến Thức' }} />
            <Tab.Screen name="Tasks" component={TasksScreen} options={{ title: 'Tác Vụ' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppProvider>
  );
}
