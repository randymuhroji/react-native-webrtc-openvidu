
import React, { Component } from 'react';

import {
	AppRegistry,
	StyleSheet,
	View,
} from 'react-native';

import Main from './src/components/Main';
import Main2 from './src2/Main'

export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Main2 />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
});

