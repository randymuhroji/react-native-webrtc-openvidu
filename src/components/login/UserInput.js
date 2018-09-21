import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
} from 'react-native';

export default class UserInput extends Component {

	render() {
		return (
			<View style={styles.inputWapper}>

				<Image source={this.props.source} style={styles.inlineImg} />

				<TextInput
					style={styles.input}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					placeholderTextColor='white'
					underlineColorAndroid='transparent'
					onChangeText={(text) => this.props.callback(text)}
				/>
			</View>
		);
	}
}

// UserInput.PropTypes = {
// 	source: PropTypes.number.isRequired,
// 	placeholder: PropTypes.string.isRequired,
// 	secureTextEntry: PropTypes.bool,
// 	autoCorrect: PropTypes.bool,
// 	autoCapitalize: PropTypes.string,
// 	returnKeyType: PropTypes.string,
// };



const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
	inputWapper: {
		flex: 1,
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 5,
	},
	input: {
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		width: DEVICE_WIDTH - 40,
		height: 40,
		marginHorizontal: 20,
		fontWeight: 'bold',
		fontSize: 14,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#ffffff',
	}
});
