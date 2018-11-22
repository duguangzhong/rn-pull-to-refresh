demo
------
![image](https://github.com/dgzfree/rn-pull-to-refresh/blob/master/demo.gif)  

------
install
--------
npm install dgz-rn-pull-to-refresh --save

------
base usage
----
```javascript
import PullView from 'dgz-rn-pull-to-refresh';
...
  render() {
        return (
            <View style={styles.container}>
                <PullView/>
            </View>
        );
    }
...
```
see TestPullRefresh to learn more

--------
API
-----
    pullAble: PropTypes.bool,//是否可以下拉
    enableLoadMore: PropTypes.bool,//是否可以加载更多
    showHeaderView: PropTypes.bool,//是否展示header
    showNavigationView: PropTypes.bool,//是否展示navigation
    showStickyView: PropTypes.bool,//是否展示sticky
    refreshViewInitPosition: PropTypes.number,//refreshView视图初始偏移
    pullOkMargin: PropTypes.number,//下拉距离触发刷新的临界值（插值之前）
    refreshingMargin: PropTypes.number,//刷新状态时位置
    duration: PropTypes.number,//默认动画执行时间
    driveRefreshViewProportion: PropTypes.number,//驱动刷新视图
    driveListView: PropTypes.number,//驱动列表视图
    loadMoreSwitchBottomMargin: PropTypes.number,//滑动到距底部多少触发加载更多
    stickyViewAnimatedMoveDis: PropTypes.number,//粘性头部向上移动距离
    placeHolderViewBackgroundColor: PropTypes.string,//下拉刷新背景

    renderRefreshView: PropTypes.func,
    renderHeaderView: PropTypes.func,
    renderStickyView: PropTypes.func,
    renderListView: PropTypes.func,
    renderLoadMoreView: PropTypes.func,

    onPull: PropTypes.func,
    onScroll: PropTypes.func,
    getScrollView: PropTypes.func,
    getPullDrive: PropTypes.func,
    getScrollDrive: PropTypes.func,
    getIfStickyViewInNavigation: PropTypes.func,
    getStickyViewPageY: PropTypes.func,
    getNavigationViewHeight: PropTypes.func,

    onRefreshViewStateToDefault: PropTypes.func,
    onRefreshViewStateToEnoughToRefresh: PropTypes.func,
    onRefreshViewStateToRefreshing: PropTypes.func,
    onRefreshViewStateToComplete: PropTypes.func,

    onShouldRefresh: PropTypes.func,
    onShouldLoadMore: PropTypes.func


    
  you can also get original animated.value,it will support the anim yourself,see the fun start with 'get'
  
