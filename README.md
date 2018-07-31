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
    |         props                   |                            description    |
    |---------------------------------|:-----------------------------------------:|
    |pullAble                         |       是否可以下拉                         |       
    |showBouncesView                  |        是否展示缩放header                  |
    |pullOkMargin                     |     下拉距离触发刷新的临界值（插值之前）     |
   
