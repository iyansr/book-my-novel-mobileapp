import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const FIVE_SECONDS = 3000

export default class SplashScreen extends React.Component {
	async componentDidMount() {
		if (await AsyncStorage.getItem('userData')) {
			this.props.navigation.navigate('App')
		} else {
			this.props.navigation.navigate('AuthScreen')
		}
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<ActivityIndicator size='large' color='#0000ff' />
			</View>
		)
	}
}
