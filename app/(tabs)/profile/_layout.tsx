import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerTitle: 'Profile', headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
