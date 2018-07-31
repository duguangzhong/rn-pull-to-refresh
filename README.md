install：
--------
npm install "rn-dgz-pull-to-refresh" --save

------
base usge:
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
api
-----

props                                 |     description                      |    default
----                                  |------                                |----
pullAble                              |       是否可以下拉                    |       true
showBouncesView                       |        是否展示缩放header             |       true
pullOkMargin                          |     下拉距离触发刷新的临界值（插值之前）|       60
refreshingMargin                      |    刷新状态时位置                     |300
duration                              |     默认动画执行时间                  |500
driveRefreshViewProportion            |    驱动刷新视图                       |5
bouncesViewMaxPullLengthToWindowHeight| 拉动的距离达到峰值时的比例                 |4
bouncesViewMaxScale                   | 达到峰值时的缩放倍数|2
driveListViewWithBouncesView          | 驱动列表视图|6
driveListViewWithoutBouncesView    | 驱动列表视图|4
showStickyView                      |    是否展示粘性头部|true
stickyOffset                       | 滚动到多少吸住|sticky视图初始偏移
navigationViewCanMove              |   顶栏跟随哪个手势|false 跟随scroll
loadMoreSwitchBottomMargin         |  滑动到距底部多少触发加载更多|100
renderNavigationView||renderDefaultNavigationView
renderRefreshView||renderDefaultRefreshView
renderBouncesView||renderDefaultBouncesView
renderStickyView||renderDefaultStickyView
renderListView||renderDefaultListView
renderLoadMoreView||renderDefaultLoadMoreView
onPull||
onScroll||
getScrollView||
getPullDrive||
getScrollDrive||
onRefreshViewStateToDefault||
onRefreshViewStateToEnoughToRefresh||
onRefreshViewStateToRefreshing||
onRefreshViewStateToComplete||
onShouldRefresh||defaultOnShouldRefresh
onShouldLoadMore||
    
  you can also get original animated.value,it will support the anim yourself,see the fun start with 'get'
  
