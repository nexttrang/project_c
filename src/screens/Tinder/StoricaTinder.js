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
  stories: any
};

type State = {
  swipedAllCards: any,
  swipeDirection: any,
  isSwipingBack: any,
  cardIndex: any
};

export default class StoricaTinder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log('StoricaTinder constructor props', props);
    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(newProps: Props) {
    console.log('new props StoricaTinder', newProps);
  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Image
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
          source={require('../../assets/keep_going.png')}
        />

        <Text style={styles.text}>{card.name}</Text>
      </View>
    );
  };

  onSwiped = type => {
    console.log(`on swiped ${type}`);
  };

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    });
  };

  render() {
    const { stories } = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a0223'
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#1a0223',
            bottom: 100
          }}
        >
          {stories.headers && (
            <Swiper
              ref={swiper => {
                this.swiper = swiper;
              }}
              backgroundColor={'#1a0223'}
              onSwipedLeft={() => this.onSwiped('left')}
              onSwipedRight={() => this.onSwiped('right')}
              cards={stories.headers}
              cardIndex={this.state.cardIndex}
              cardVerticalMargin={20}
              renderCard={this.renderCard}
              onSwipedAll={this.onSwipedAllCards}
              stackSize={3}
              stackSeparation={15}
              overlayLabels={{
                left: {
                  title: 'NOPE',
                  style: {
                    label: {
                      backgroundColor: 'black',
                      borderColor: 'black',
                      color: 'white',
                      borderWidth: 1
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: -30
                    }
                  }
                },
                right: {
                  title: 'LIKE',
                  style: {
                    label: {
                      backgroundColor: 'black',
                      borderColor: 'black',
                      color: 'white',
                      borderWidth: 1
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: 30
                    }
                  }
                }
              }}
              animateOverlayLabelsOpacity
              animateCardOpacity
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  card: {
    height: '60%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  }
};

/*
<View
          style={{
            position: 'absolute',
            height: 100,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#1a0223',
            flexDirection: 'row'
          }}
        >
          <Button onPress={() => console.log('on Like')} title="Like">
            Like
          </Button>
          <Button onPress={() => console.log('on Dislike')} title="Dislike">
            Dislike
          </Button>
        </View>
*/
