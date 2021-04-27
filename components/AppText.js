import React from "react";
import { Text } from "react-native";
import defaultSyles from '../config/styles'
function AppText({ children, style, adjust = false, ...otherProps }) {
  return <Text style={[defaultSyles.text, style]} adjustsFontSizeToFit={adjust} {...otherProps}  >{children}</Text>;
}



export default AppText;
