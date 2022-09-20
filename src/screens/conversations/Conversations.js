//@flow
import React, { Component } from 'react';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Button } from '../../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';
import Stories from '../../tempData/DataSource';

type Props = {
  stories: any,
  onStoryPress: any
};

type State = {};

export default class StoricaTinder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log('StoricaTinder constructor props', props);
  }

  componentDidMount() {}

  componentWillReceiveProps(newProps: Props) {
    console.log('new props StoricaTinder', newProps);
  }

  onRenderItem = ({ item }: any) => {
    console.log('item to render', item);

    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => {
          console.log('on press selected item', item);
          this.props.onStoryPress(item);
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%'
          }}
        >
          <Image
            style={{
              marginLeft: 10,
              width: 40,
              height: 40,
              borderRadius: 20
            }}
            source={require('../../assets/keep_going.png')}
          />
          <Text style={{ marginLeft: 10, color: 'white', fontSize: 20 }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { stories } = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={stories.headers}
          renderItem={this.onRenderItem}
          keyExtractor={item => item.storyId}
          extraData={this.state}
          style={{ width: '100%' }}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  cell: {
    width: '100%',
    height: 70
  }
};
