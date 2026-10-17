import { SymbolView, type SFSymbol } from 'expo-symbols';
import { Tabs } from 'expo-router';
import { type ColorValue } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabIcon({
  color,
  ios,
  material,
}: {
  color: ColorValue;
  ios: SFSymbol;
  material: 'school' | 'chat_bubble' | 'auto_stories' | 'refresh' | 'person';
}) {
  return (
    <SymbolView
      name={{ ios, android: material, web: material }}
      tintColor={color}
      size={26}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Учиться',
          tabBarIcon: ({ color }) => (
            <TabIcon color={color} ios="graduationcap.fill" material="school" />
          ),
        }}
      />
      <Tabs.Screen
        name="phrasebook"
        options={{
          title: 'Фразы',
          tabBarIcon: ({ color }) => (
            <TabIcon color={color} ios="bubble.left.and.bubble.right.fill" material="chat_bubble" />
          ),
        }}
      />
      <Tabs.Screen
        name="culture"
        options={{
          title: 'Культура',
          tabBarIcon: ({ color }) => (
            <TabIcon color={color} ios="books.vertical.fill" material="auto_stories" />
          ),
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          title: 'Повторение',
          tabBarIcon: ({ color }) => (
            <TabIcon color={color} ios="arrow.clockwise" material="refresh" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => (
            <TabIcon color={color} ios="person.fill" material="person" />
          ),
        }}
      />
    </Tabs>
  );
}
