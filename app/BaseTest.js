import React, {PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import PullView from 'dgz-rn-pull-to-refresh';

export default class BaseTest extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <PullView/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

