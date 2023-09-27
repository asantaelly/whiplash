import React from "react";
import {
  Text,
  StyleProp,
  TextProps,
  TextStyle,
  StyleSheet,
} from "react-native";

import { font } from "../../../themes/fonts";

interface Props extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const AppText: React.FC<Props> = (props) => {
  const { children, style } = props;
  return (
    <Text style={[styles.default, font.base_regular, style]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: "#000000",
  },
});

export default AppText;
