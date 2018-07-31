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

props   |  description   | default
----|------|----
    pullAble                         |       是否可以下拉                         |       /
    showBouncesView                  |        是否展示缩放header                  |/
    pullOkMargin                     |     下拉距离触发刷新的临界值（插值之前）     |/
   
 
|refreshingMargin                 |    刷新状态时位置|
    |duration                         |     默认动画执行时间|
    |driveRefreshViewProportion       |    驱动刷新视图|
    |bouncesViewMaxPullLengthToWindowHeight| 拉动到1/3的距离达到峰值|
    |bouncesViewMaxScale                   | 达到峰值时的缩放倍数|
    |driveListViewWithBouncesView          | 驱动列表视图|
    |driveListViewWithoutBouncesView    | 驱动列表视图|
    |showStickyView                      |    是否展示粘性头部|
    |stickyOffset                       | 滚动到多少吸住|
    |navigationViewCanMove              |   顶栏跟随哪个手势|
    |loadMoreSwitchBottomMargin         |  滑动到距底部多少触发加载更多|

    |renderRefreshView|
    |renderBouncesView|
    |renderStickyView|
    |renderListView|
    |renderLoadMoreView|

    |onPull|
    |onScroll|
    |getScrollView|

    |getPullDrive|
    |getScrollDrive|

    |onRefreshViewStateToDefault|
    |onRefreshViewStateToEnoughToRefresh|
    |onRefreshViewStateToRefreshing|
    |onRefreshViewStateToComplete|

    |onShouldRefresh|
    |onShouldLoadMore|
    
  you can also get original animated.value,it will support the anim yourself,see the fun start with 'get'
  
