import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

interface CustomStatusBarProps extends StatusBarProps {
  backgroundColor: string;
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = props => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar
      backgroundColor={props.backgroundColor}
      barStyle={props.barStyle}
    />
  ) : null;
};

export default CustomStatusBar;
