/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, TextProps, ViewProps } from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native-ui-lib';

const getDefaultTheme = async () => {
  return await AsyncStorage.getItem('theme');
}

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const is_dark = 'dark';
  const color = is_dark === 'dark' ? Colors.$textDefaultLight : Colors.$textDefault;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const is_dark = 'dark';
  const backgroundColor = is_dark === 'dark' ? Colors.$backgroundDark : Colors.$backgroundDefault;

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
