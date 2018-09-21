import React, { Component } from 'react';
import Dimensions from 'Dimensions';

import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import spinner from '../../images/loading.gif';

import Show from '../../utils/toast-utils';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonSubmit extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: false,
		};

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}

	_onPress() {

		if (this.props.userNameValue == null || this.props.userNameValue == '') {
			Show('Username is reqiured');
			return;
		}

		if (this.props.roomNameValue == null || this.props.userNameValue == '') {
			Show('SessionId is required');
			return;
		}

		if (this.state.isLoading) return;

		this.setState({ isLoading: true });
		Animated.timing(this.buttonAnimated, {
			toValue: 1,
			duration: 200,
			easing: Easing.linear
		}).start();

		setTimeout(() => this._onGrow(), 2000);

		console.log('- roomNameValue', this.props.roomNameValue)
		const req = JSON.stringify({
			"customSessionId":this.props.roomNameValue
		})

		fetch('https://rtc3.circledoo.com:4443/api/sessions', {
			headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json; charset=utf-8',
					Authorization: 'Basic T1BFTlZJRFVBUFA6OFczWEhDNGQzZENMb3VZaldiek5QelhvSGNvSW9VSmo=',
			},
			method: 'POST',
			body: req,
		})
			.then(response => typeof response === 'string' && response.json() )
			.then((responseData) => {

				console.log('---responseData post session', responseData)
			
				setTimeout(() => {
					Actions.videoScreen({ userName: this.props.userNameValue, roomName: this.props.roomNameValue });
					this.setState({ isLoading: false });
					this.buttonAnimated.setValue(0);
					this.growAnimated.setValue(0);
				}, 200);

			})
			.catch((error) => {
				console.log(error)
			})
	
	}

	_onGrow() {
		Animated.timing(this.growAnimated, {
			toValue: 1,
			duration: 200,
			Easing: Easing.linear
		}).start();
	}

	render() {

		const changeWidth = this.buttonAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
		});

		const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, MARGIN]
		});

		return (
			<View style={styles.container}>
				<Animated.View style={{ width: changeWidth }}>
					<TouchableOpacity
						style={styles.button}
						onPress={this._onPress}
						// activeOpacity={1}
					>
						{
							this.state.isLoading ?
								<Image source={spinner} style={styles.image} />
								:
								<Text style={styles.text}>JOIN</Text>
						}
					</TouchableOpacity>
					<Animated.View style={[styles.circle, { transform: [{ scale: changeScale }] }]} />
				</Animated.View>
			</View>
		);
	}

}

const styles = StyleSheet.create({

	container: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
	},

	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#F035E0',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#F035E0',
	},

	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},

	image: {
		width: 24,
		height: 24,
	},

});
