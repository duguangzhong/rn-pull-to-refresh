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

props                                 |     description                      |    default
----                                  |------                                |----
pullAble                              |       是否可以下拉                    |       true
showBouncesView                       |        是否展示缩放header             |       true
showNavigationView                    |       是否展示导航栏                  |      true
pullOkMargin                          |     下拉距离触发刷新的临界值（插值前）|       60
refreshingMargin                      |    刷新状态时位置                     |300
duration                              |     默认动画执行时间                  |500
driveRefreshViewProportion            |    驱动刷新视图                       |5
bouncesViewMaxPullLengthToWindowHeight| 拉动的距离达到峰值时的比例                 |4
bouncesViewMaxScale                   | 达到峰值时的缩放倍数|2
driveListViewWithBouncesView          | 驱动列表视图|6
driveListViewWithoutBouncesView    | 驱动列表视图|4
showStickyView                      |    是否展示粘性头部|true
loadMoreSwitchBottomMargin         |  滑动到距底部多少触发加载更多|100
renderNavigationView|如果不需要stickyHeader插入navigationView，则不应该使用此视图，应在外部自行实现|renderDefaultNavigationView
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
  
