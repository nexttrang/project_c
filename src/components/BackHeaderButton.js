/* @flow */
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Assets } from '../../components/common';
import SvgUri from 'react-native-svg-uri';

class BackHeaderButton extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentWillReceiveProps(props: any) {
    console.log('BackButton props', props);
    this.props = props;
  }

  render() {
    const { title, navigation, customStyle } = this.props;
    let newStyle = [styles.buttonStyle, customStyle];

    return (
      <TouchableOpacity
        style={newStyle}
        onPress={() => navigation.goBack(null)}
      >
        <SvgUri
          width={15}
          height={15}
          svgXmlData={Assets.BACK_WHITE_BUTTON}
          style={{ marginTop: 3 }}
        />
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'white',
    marginLeft: 5
  }
};

export { BackHeaderButton };
