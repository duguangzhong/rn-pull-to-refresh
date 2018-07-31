# rn-pull-to-refresh
pull-to-refresh+sticky
#install：
npm install "rn-dgz-pull-to-refresh" --save
#base usge:
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
//see TestPullRefresh to learn more
#api
             props                                               description                                        default
    pullAble: PropTypes.bool,                                 //是否可以下拉                                 ./node_modules/rn-dgz-pull-to-refresh/PullableView->defaultProps
    showBouncesView: PropTypes.bool,                          //是否展示缩放header
    pullOkMargin: PropTypes.number,                           //下拉距离触发刷新的临界值（插值之前）
    refreshingMargin: PropTypes.number,                       //刷新状态时位置
    duration: PropTypes.number,                               //默认动画执行时间
    driveRefreshViewProportion: PropTypes.number,             // 驱动刷新视图
    bouncesViewMaxPullLengthToWindowHeight: PropTypes.number, //拉动到1/3的距离达到峰值
    bouncesViewMaxScale: PropTypes.number,                    //达到峰值时的缩放倍数
    driveListViewWithBouncesView: PropTypes.number,           //驱动列表视图
    driveListViewWithoutBouncesView: PropTypes.number,        //驱动列表视图
    showStickyView: PropTypes.bool,                           //是否展示粘性头部
    stickyOffset: PropTypes.number,                           //滚动到多少吸住
    navigationViewCanMove: PropTypes.bool,                    //顶栏跟随哪个手势
    loadMoreSwitchBottomMargin: PropTypes.number,             //滑动到距底部多少触发加载更多

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

    onShouldRefresh: PropTypes.func,
    onShouldLoadMore: PropTypes.func,
    
  you can also get original animated.value,it will support the anim yourself,see the fun start with 'get'
  
