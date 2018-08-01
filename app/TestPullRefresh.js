import React, {PureComponent} from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    Animated
} from 'react-native';

import PullView from 'dgz-rn-pull-to-refresh';
export default class extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            pullDrive: new Animated.ValueXY(),
            scrollDrive: new Animated.Value(0),
        };
    }

    renderRefreshView = (type) => {
        let refreshView;
        switch (type) {
            case 'default':
                refreshView = <Text>下拉刷新</Text>;
                break;
            case 'enough':
                refreshView = <Text>松开触发刷新</Text>;
                break;
            case 'refreshing':
                refreshView = <Text>正在刷新</Text>;
                break;
            case 'complete':
                refreshView = <Text>完成</Text>;
                break;
            default:
                break;
        }
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'skyblue',
                height: 30
            }}>
                {refreshView}
            </View>
        );
    };

    renderNavigationView = () => {
        return (
            <View style={{
                height: 50,
                justifyContent: 'center',
                backgroundColor: 'mediumpurple',
            }}>
                <Text> 导航</Text>
            </View>
        )
    };

    renderBouncesView = () => {
        return (
            <View style={{
                backgroundColor: 'pink',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200
            }}>
                <Text>下拉缩放</Text>
            </View>
        )
    };

    renderStickyView = () => {
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
                    <Text >粘性头部</Text>
                </View>
            </View>
        );
    };

    renderListView = () => {
        return (
            <View>
                <View style={{height: 100, backgroundColor: 'blueviolet'}}/>
                <View style={{height: 100, backgroundColor: 'skyblue'}}/>
                <View style={{height: 100, backgroundColor: 'blueviolet'}}/>
                <View style={{height: 100, backgroundColor: 'skyblue'}}/>
                <View style={{height: 100, backgroundColor: 'blueviolet'}}/>
                <View style={{height: 100, backgroundColor: 'skyblue'}}/>
                <View style={{height: 100, backgroundColor: 'blueviolet'}}/>
                <View style={{height: 100, backgroundColor: 'skyblue'}}/>
            </View>);
    };

    renderLoadMoreView = (type) => {
        let loadMoreView;
        switch (type) {
            case 'default':
                loadMoreView = <Text>默认状态</Text>;
                break;
            case 'loading':
                loadMoreView = <Text>加载状态</Text>;
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

    onPull = (event) => {
        //console.log('pullY：' + event.y)
    };

    onScroll = (event) => {
        //console.log('scrollY：' + event.value)
    };

    getScrollView = (view) => {
        this.scrollViewRef = view;
    };

    getScrollDrive = (drive) => {
        this.setState({scrollDrive: drive});
    };

    getPullDrive = (drive) => {
        this.setState({pullDrive: drive});
    };

    onRefreshViewStateToDefault = () => {
    };

    onRefreshViewStateToEnoughToRefresh = () => {
    };

    onRefreshViewStateToRefreshing = () => {
    };

    onRefreshViewStateToComplete = () => {
    };

    onShouldRefresh = (resolve) => {
        //do something
        setTimeout(() => {
            resolve();
        }, 2000);
    };

    onShouldLoadMore = (resolve) => {
        //do something
        setTimeout(() => {
            resolve();
        }, 2000);
    };

    handlePress = () => {
        this.scrollViewRef.getNode().scrollTo({y: 0, animated: true})
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <PullView
                    //pullAble={true}
                    //showBouncesView={true}
                    //showStickyView={true}
                    //showNavigationView={false}
                    //stickyOffset={20}
                    //refreshViewHeight={60}
                    //pullOkMargin={60}
                    //refreshingMargin={300}
                    //duration={500}
                    //driveRefreshViewProportion={5}
                    //bouncesViewMaxPullLengthToWindowHeight={4}
                    //bouncesViewMaxScale={2}
                    //driveListViewWithBouncesView={6}
                    //driveListViewWithoutBouncesView={4}
                    //loadMoreSwitchBottomMargin={100}

                    //renderRefreshView={this.renderRefreshView}
                    //renderNavigationView={this.renderNavigationView}
                    //renderBouncesView={this.renderBouncesView}
                    //renderStickyView={this.renderStickyView}
                    //renderListView={this.renderListView}
                    //renderLoadMoreView={this.renderLoadMoreView}

                    //onPull={this.onPull}
                    //onScroll={this.onScroll}
                    getScrollView={this.getScrollView}
                    getScrollDrive={this.getScrollDrive}
                    getPullDrive={this.getPullDrive}

                    //onRefreshViewStateToDefault={this.onRefreshViewStateToDefault}
                    //onRefreshViewStateToEnoughToRefresh={this.onRefreshViewStateToEnoughToRefresh}
                    //onRefreshViewStateToRefreshing={this.onRefreshViewStateToRefreshing}
                    //onRefreshViewStateToComplete={this.onRefreshViewStateToComplete}

                    //onShouldRefresh={this.onShouldRefresh}
                    onShouldLoadMore={this.onShouldLoadMore}
                />

                <Animated.View style={{
                    position: 'absolute', bottom: 200, right: 10,
                    transform: [{
                        translateY: this.state.pullDrive.y.interpolate({
                            inputRange: [0, 10],
                            outputRange: [0, -1]
                        })
                    }],
                }}>
                    <Text>testPullDrive</Text>
                </Animated.View>

                <Animated.View style={{
                    position: 'absolute', bottom: 100, right: 10,
                    transform: [{
                        translateY: this.state.scrollDrive.interpolate({
                            inputRange: [0, 10],
                            outputRange: [0, -1]
                        })
                    }],
                }}>
                    <Text>testScrollDrive</Text>
                </Animated.View>

                <View style={{position: 'absolute', bottom: 10, right: 10}}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this.handlePress}
                    >
                        <Text>back to top</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

