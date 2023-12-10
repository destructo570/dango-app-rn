/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, TextProps, ViewProps } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native-ui-lib';
import { useEffect, useState } from 'react';

const useDarkTheme = async () => {
  return await AsyncStorage.getItem('isDark');
}


function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem('isDark');
        setIsDark(theme === 'true');
      } catch (error) {
        // Handle error fetching theme
        console.error("Error fetching theme:", error);
      }
    };

    fetchTheme();
  }, []);

  return isDark;
}

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const isDark = useDarkMode();

  const color = isDark ? Colors.$textDefaultLight : Colors.$textDefault;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const isDark = useDarkMode();
  const backgroundColor = isDark ? Colors.$backgroundDark : Colors.$backgroundDefault;

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
