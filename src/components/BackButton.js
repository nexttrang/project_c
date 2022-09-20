/* @flow */
import React, { Component } from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';
import { Assets } from '../../components/common';
import SvgUri from 'react-native-svg-uri';

class BackButton extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentWillReceiveProps(props: any) {
    console.log('BackButton props', props);
    this.props = props;
  }

  render() {
    const { title } = this.props;
    const { navigation } = this.props;

    let shouldShowBackText = false;
    console.log('Backtitle', title);
    console.log('Platform', Platform);

    if (title && Platform.OS === 'ios') {
      shouldShowBackText = true;
    }

    console.log('shouldShowBackText', shouldShowBackText);

    console.log('this.props backbutton', this.props);

    return (
      <TouchableOpacity
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        style={styles.backButtonStyle}
        onPress={() => navigation.goBack(null)}
      >
        <SvgUri
          width={15}
          height={15}
          svgXmlData={Assets.BACK_BLUE_BUTTON}
          style={{ marginLeft: 10 }}
        />
        {/* {shouldShowBackText && <Text style={styles.textStyle}>{title}</Text>} */}
      </TouchableOpacity>
    );
  }
}

const styles = {
  backButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    color: '#0060FF',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 15,
    marginLeft: 5
  }
};

export { BackButton };
