/**
 *  author dgz
 *  遗留问题:
 *            1：快速向下滑动 被中断监听捕获，如此次手势开始为向下滑动，随后转为向上滑动，逻辑判定为不应该出发下拉刷新，
 *               为保证操作后立即作出响应，现处理为中断立即触发刷新动作 没有等待release时刻判断的最终逻辑结果
 *            2：视图无法响应两个动画驱动，所以title要不跟pull，要不跟scroll，要不放在最外层停在那=>sticky无法插入
 * 任何问题或者bug：QQ喊我
 */

import React, {PureComponent, PropTypes} from "react";
import {Text, View, Dimensions, Animated, ScrollView, PanResponder, NativeModules} from "react-native";
import LoadMoreView from './AnimLoadMore'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const renderDefaultRefreshView = (type) => {
  let refreshView;
  switch (type) {
    case 'default':
      refreshView = <Text>Pull to refresh</Text>;
      break;
    case 'enough':
      refreshView = <Text>Let go will refresh</Text>;
      break;
    case 'refreshing':
      refreshView = <Text>Refreshing</Text>;
      break;
    case 'complete':
      refreshView = <Text>Refresh to complete</Text>;
      break;
    default:
      break;
  }
  return (
    <View style={{
      zIndex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        borderRadius: 10,
        width: 150,
        height: 30
      }}>
        {refreshView}
      </View>
    </View>
  );
};

const renderDefaultNavigationView = () => {
  return (
    <View style={{
      height: 50,
      width: windowWidth,
      justifyContent: 'center',
      backgroundColor: 'mediumpurple',
    }}>
      <Text> title</Text>
    </View>
  )
};

const renderDefaultBouncesView = () => {
  return (
    <View style={{
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
      height: 200
    }}>
      <Text>Pull To Scale</Text>
    </View>
  )
};

const renderDefaultStickyView = () => {
  return (
    <View style={{
      zIndex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
    }}>
      <View style={{
        backgroundColor: 'khaki',
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 40,
        borderRadius: 10,
      }}>
        <Text >StickyView</Text>
      </View>
    </View>
  );
};

const renderDefaultListView = () => {
  return (
    <View>
      <View style={{height: 100, backgroundColor: 'lightgrey'}}/>
      <View style={{height: 100, backgroundColor: 'grey'}}/>
      <View style={{height: 100, backgroundColor: 'lightgrey'}}/>
      <View style={{height: 100, backgroundColor: 'grey'}}/>
      <View style={{height: 100, backgroundColor: 'lightgrey'}}/>
      <View style={{height: 100, backgroundColor: 'grey'}}/>
      <View style={{height: 100, backgroundColor: 'lightgrey'}}/>
      <View style={{height: 100, backgroundColor: 'grey'}}/>
    </View>);
};

const renderDefaultLoadMoreView = (type) => {
  let loadMoreView;
  switch (type) {
    case 'default':
      loadMoreView = <Text>default</Text>;
      break;
    case 'loading':
      loadMoreView = <LoadMoreView/>;
      break;
    default:
      break;
  }
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: 50
    }}>
      {loadMoreView}
    </View>);
};

const onDefaultPullRelease = (resolve) => {
  //do something
  setTimeout(() => {
    resolve();
  }, 1000);
};

export default class extends PureComponent {

  static propTypes = {
    pullAble: PropTypes.bool,                              //是否可以下拉
    showBouncesView: PropTypes.bool,                       //是否展示缩放header
    pullOkMargin: PropTypes.number,                        //下拉距离触发刷新的临界值（插值之前）
    refreshingMargin: PropTypes.number,                    //刷新状态时位置
    duration: PropTypes.number,                             //默认动画执行时间
    driveRefreshViewProportion: PropTypes.number,           // 驱动刷新视图
    bouncesViewMaxPullLengthToWindowHeight: PropTypes.number, //拉动到1/3的距离达到峰值
    bouncesViewMaxScale: PropTypes.number,                   //达到峰值时的缩放倍数
    driveListViewWithBouncesView: PropTypes.number,         //驱动列表视图
    driveListViewWithoutBouncesView: PropTypes.number,        //驱动列表视图
    showStickyView: PropTypes.bool,                           //是否展示粘性头部
    stickyOffset: PropTypes.number,                           //滚动到多少吸住
    navigationViewCanMove: PropTypes.bool,                    //顶栏跟随哪个手势

    renderRefreshView: PropTypes.func,
    renderBouncesView: PropTypes.func,
    renderStickyView: PropTypes.func,
    renderListView: PropTypes.func,
    renderLoadMoreView: PropTypes.func,

    onPull: PropTypes.func,
    onScroll: PropTypes.func,
    getScrollView: PropTypes.func,

    getPullDrive: PropTypes.func,
    getScrollDrive: PropTypes.func,

    onRefreshViewStateToDefault: PropTypes.func,
    onRefreshViewStateToEnoughToRefresh: PropTypes.func,
    onRefreshViewStateToRefreshing: PropTypes.func,
    onRefreshViewStateToComplete: PropTypes.func,

    onPullRelease: PropTypes.func,
    onScrollEndDrag: PropTypes.func,
  };

  static defaultProps = {
    pullAble: true,
    showBouncesView: true,
    showStickyView: true,
    pullOkMargin: 60,
    refreshingMargin: 300,
    duration: 500,
    driveRefreshViewProportion: 5,
    bouncesViewMaxPullLengthToWindowHeight: 4,
    bouncesViewMaxScale: 2,
    driveListViewWithBouncesView: 6,
    driveListViewWithoutBouncesView: 4,
    navigationViewCanMove: false,

    renderRefreshView: renderDefaultRefreshView,
    renderNavigationView: renderDefaultNavigationView,
    renderBouncesView: renderDefaultBouncesView,
    renderStickyView: renderDefaultStickyView,
    renderListView: renderDefaultListView,
    renderLoadMoreView: renderDefaultLoadMoreView,

    onPullRelease: onDefaultPullRelease
  };

  constructor(props) {
    super(props);
    this.state = {
      pullPan: new Animated.ValueXY(),
      scrollY: new Animated.Value(0),
      carePanResponder: true,                //是否应该关注此次手势
      pullState: {type: 'default'}, //  default：下拉进行刷新；enough：松手进入刷新状态；refreshing：正在刷新；complete：刷新完成
      loadMoreState: {type: 'default'}, //default:默认状态，loading:加载状态
      stickyHeaderY: 0
    };

    this.panResponder = PanResponder.create({
      //onStartShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
      // onPanResponderMove: Animated.event([null, {dx: this.state.pullPan.x, dy: this.state.pullPan.y}]),
      onPanResponderMove: this.onPanResponderMove.bind(this),
      onPanResponderTerminate: this.onPanResponderTerminate.bind(this),
      onPanResponderRelease: this.onPanResponderRelease.bind(this),
    });
  }

  componentDidMount() {
    this.state.pullPan.addListener((info) => {
      this.props.onPull && this.props.onPull(info);
    });

    this.state.scrollY.addListener((info) => {
      this.props.onScroll && this.props.onScroll(info);
      if (info.value <= 0) {
        this.setState({carePanResponder: true});
      } else {
        this.setState({carePanResponder: false});
      }
    });

    this.props.getScrollView && this.props.getScrollView(this.refs.scrollView);
    this.props.getPullDrive && this.props.getPullDrive(this.state.pullPan);
    this.props.getScrollDrive && this.props.getScrollDrive(this.state.scrollY);
  }

  onShouldSetPanResponder(e, gesture) {
    let shouldSetPanResponder = this.props.pullAble
      && this.state.carePanResponder
      && (this.state.pullState.type == 'default' || this.state.pullState.type == 'complete')
      && (gesture.dy > 0);
    if (shouldSetPanResponder) {
      this.refs.scrollView.setNativeProps({
        scrollEnabled: false
      });
    }
    return shouldSetPanResponder
  }

  onPanResponderMove(e, gesture) {
    this.state.pullPan.setValue({x: 0, y: gesture.dy});
    if (gesture.dy >= this.props.pullOkMargin * this.props.driveRefreshViewProportion) {
      this.setState({pullState: {type: 'enough'}});
      this.props.onRefreshViewStateToEnoughToRefresh && this.props.onRefreshViewStateToEnoughToRefresh();
    } else {
      this.setState({pullState: {type: 'default'}});
      this.props.onRefreshViewStateToDefault && this.props.onRefreshViewStateToDefault();
    }
  }

  onPanResponderTerminate(e, gesture) {
    this.doRefresh();
  }

  onPanResponderRelease(e, gesture) {
    if (gesture.dy >= this.props.pullOkMargin * this.props.driveRefreshViewProportion) {
      this.doRefresh();
    } else {
      this.setState({pullState: {type: 'default'}});
      this.backToDefault();
    }
  }

  doRefresh = () => {
    Animated.spring(this.state.pullPan, {
      toValue: {x: 0, y: this.props.refreshingMargin},
      duration: this.props.duration
    }).start();
    setTimeout(() => {

      this.setState({pullState: {type: 'refreshing'}});
      this.props.onRefreshViewStateToRefreshing && this.props.onRefreshViewStateToRefreshing();
      this.props.onPullRelease ? this.props.onPullRelease(this.resolvePullHandler) : onDefaultPullRelease(this.resolvePullHandler);
    }, this.props.duration);
  };

  resolvePullHandler = () => {
    this.setState({pullState: {type: 'complete'}});
    this.props.onRefreshViewStateToComplete && this.props.onRefreshViewStateToComplete();
    this.backToDefault();
  };

  backToDefault = () => {
    this.refs.scrollView.setNativeProps({
      scrollEnabled: true
    });
    Animated.spring(this.state.pullPan, {toValue: {x: 0, y: 0}}).start();
  };

  onStickyHeaderLayout = (e) => {
    NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
      this.setState({
        stickyHeaderY: pageY
      });
    });
  };

  onScrollEndDrag = (e) => {
    this.setState({loadMoreState: {type: 'loading'}});
    this.props.onScrollEndDrag && this.props.onScrollEndDrag(this.resolveLoadMoreHandler);
  };

  resolveLoadMoreHandler = () => {
    this.setState({loadMoreState: {type: 'default'}});
  };

  render() {
    let stickyY = this.props.stickyOffset ? this.props.stickyOffset : (this.state.stickyHeaderY == 0 ? 30 : this.state.stickyHeaderY);

    let placeHolderView = <View style={{height: windowHeight}}/>;//占位视图

    let navigationView = <Animated.View
      style={{
        position: this.props.showBouncesView ? 'absolute' : 'relative',
        top: 0,
        width: windowWidth,
        transform: [
          this.props.navigationViewCanMove ?
            {
              translateY: this.state.pullPan.y.interpolate({
                inputRange: [-1, 0, windowHeight, windowHeight + 1],
                outputRange: [0, 0, -windowHeight / this.props.driveListViewWithBouncesView, -windowHeight / this.props.driveListViewWithBouncesView]
              })
            }
            :
            {
              translateY: this.state.scrollY.interpolate({
                inputRange: [-1, 0, 0, 1],
                outputRange: [0, 0, 0, 1]
              })
            }
        ],
        opacity: !this.props.navigationViewCanMove ? this.state.scrollY.interpolate({
          inputRange: [-1, 0, stickyY, stickyY + 1],
          outputRange: [1, 1, 0.5, 0.5]
        }) : null,
      }}
    >
      {this.props.renderNavigationView()}
    </Animated.View>;

    let bouncesView = <Animated.View
      style={{
        zIndex: -999,
        transform: [{
          scale: this.state.pullPan.y.interpolate({
            inputRange: [-1, 0, windowHeight / this.props.bouncesViewMaxPullLengthToWindowHeight, windowHeight / this.props.bouncesViewMaxPullLengthToWindowHeight + 1],
            outputRange: [1, 1, this.props.bouncesViewMaxScale, this.props.bouncesViewMaxScale]
          })
        }]
      }}>
      {this.props.renderBouncesView()}
    </Animated.View>;

    let refreshView = <Animated.View
      style={{
        position: 'absolute',
        bottom: windowHeight,
        width: windowWidth,
        transform: [{
          translateY: this.state.pullPan.y.interpolate({
            inputRange: [0, this.props.driveRefreshViewProportion],
            outputRange: [0, 1]
          })
        }],
      }}>
      {this.props.renderRefreshView(this.state.pullState.type)}
    </Animated.View>;

    let listView =
      <View style={{zIndex: -999}}>
        {this.props.renderListView()}
      </View>;

    let stickyView =
      <Animated.View
        onLayout={this.onStickyHeaderLayout}
        style={{
          position: this.props.showBouncesView ? 'absolute' : 'relative',
          bottom: 0,
          width: windowWidth,
          transform: [{
            translateY: this.state.scrollY.interpolate({
              inputRange: [-1, 0, stickyY, stickyY + 1],
              outputRange: [0, 0, 0, 1]
            })
          }],
        }}>
        {this.props.renderStickyView()}
      </Animated.View>;

    let loadMoreView =
      <View>
        {this.props.renderLoadMoreView(this.state.loadMoreState.type)}
      </View>;

    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            width: windowWidth,
            marginTop: this.props.showBouncesView ? -windowHeight : 0,
            transform: [{
              translateY: this.state.pullPan.y.interpolate({
                inputRange: [0, this.props.showBouncesView ? this.props.driveListViewWithBouncesView : this.props.driveListViewWithoutBouncesView],
                outputRange: [0, 1]
              })
            }],
          }}
          {...this.panResponder.panHandlers}//注册手势
        >

          <Animated.ScrollView
            ref='scrollView'
            onScroll={Animated.event([{
              nativeEvent: {contentOffset: {y: this.state.scrollY,}}
            }], {useNativeDriver: true})}
            scrollEventThrottle={1}
            bounces={false}
            onScrollEndDrag={(e) => {
              this.onScrollEndDrag(e)
            }}
          >

            {this.props.pullAble && this.props.showBouncesView && placeHolderView}

            <View>

              {navigationView}

              {this.props.pullAble && this.props.showBouncesView && bouncesView}

              {this.props.showStickyView && stickyView}

            </View>

            {listView}

            {loadMoreView}

          </Animated.ScrollView>

        </Animated.View>

        {refreshView}

      </View>
    );
  }

}

