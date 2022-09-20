import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({
  onPress,
  children,
  customStyle,
  textColor,
  customTextStyle,
  enabled
}) => {
  const { buttonStyle, textStyle } = styles;
  let isEnabled = true;
  if (enabled !== undefined) {
    isEnabled = enabled;
  }
  return (
    <TouchableOpacity
      disabled={!isEnabled}
      onPress={isEnabled ? onPress : null}
      style={[
        buttonStyle,
        customStyle,
        { justifyContent: 'center', alignItems: 'center', flex: 1 }
      ]}
    >
      <Text
        style={[
          textStyle,
          { color: textColor },
          customTextStyle,
          { alignSelf: 'center' }
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center'
  }
};

export { Button };
