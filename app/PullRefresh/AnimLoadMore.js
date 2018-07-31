import React, {PureComponent} from 'react';
import {Text, View, Animated} from 'react-native';

export default class AnimLoadMore extends PureComponent {
  constructor(props) {
    super(props);
    this.move = new Animated.Value(0)
    this.follower1 = new Animated.Value(0)
    this.follower2 = new Animated.Value(0)
    this.follower3 = new Animated.Value(0)
  }

  componentDidMount() {
    this.startAnim();
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Animated.View
          style={{marginTop: this.move, backgroundColor: '#ff6a22', height: 7, width: 7, borderRadius: 5}}/>
        <Animated.View
          style={{
            marginLeft: 5,
            marginTop: this.follower1,
            backgroundColor: '#ff9822',
            height: 7,
            width: 7,
            borderRadius: 5
          }}/>
        <Animated.View
          style={{
            marginLeft: 5,
            marginTop: this.follower2,
            backgroundColor: '#ae6e3b',
            height: 7,
            width: 7,
            borderRadius: 3.5
          }}/>
        <Animated.View
          style={{
            marginLeft: 5,
            marginTop: this.follower3,
            backgroundColor: '#d35b4b',
            height: 7,
            width: 7,
            borderRadius: 5
          }}/>
      </View>
    );
  }

  startAnim = () => {
    //串行执行
    Animated.sequence([
      Animated.timing(this.move, {
        toValue: -20,
        duration: 150,
      }),
      Animated.timing(this.move, {
        toValue: 15,
        duration: 150,
      }),
      Animated.timing(this.move, {
        toValue: -10,
        duration: 150,
      }),
      Animated.timing(this.move, {
        toValue: 5,
        duration: 150,
      }),
      Animated.timing(this.move, {
        toValue: -3,
        duration: 150,
      }),
      Animated.timing(this.move, {
        toValue: 1,
        duration: 150,
      }),
      Animated.timing(this.move, {
        toValue: 0,
        duration: 200,
      }),
    ]).start(this.startAnim);
    Animated.spring(this.follower1, {toValue: this.move}).start();
    Animated.spring(this.follower2, {toValue: this.follower1}).start();
    Animated.spring(this.follower3, {toValue: this.follower2}).start();
  }
}

