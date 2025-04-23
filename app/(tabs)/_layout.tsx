import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue", // Цвет активной вкладки
        tabBarStyle: {
          paddingBottom: 5, // Отступ снизу (для iOS)
        },
      }}
    >
      <Tabs.Screen
        name="index" // Файл app/(tabs)/index.tsx
        options={{
          title: "Главная", // Название вкладки
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings" // Файл app/(tabs)/settings.tsx
        options={{
          title: "Настройки",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // Файл app/(tabs)/settings.tsx
        options={{
          title: "Профиль",
          tabBarIcon: ({ color }) => (
            <Ionicons name="accessibility" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats" // Файл app/(tabs)/settings.tsx
        options={{
          title: "Статка",
          tabBarIcon: ({ color }) => (
            <Ionicons name="airplane" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
