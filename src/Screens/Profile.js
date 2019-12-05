import React, { Component } from 'react'
import { Container, Button } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import {
	Text,
	View,
	ScrollView,
	Alert,
	ToastAndroid,
	ToolbarAndroid,
} from 'react-native'
import CustomHeader from '../Components/Header/Header'

class Profile extends Component {
	constructor() {
		super()
		this.state = {
			user: {},
		}
	}

	async componentDidMount() {
		if (await AsyncStorage.getItem('userData')) {
			const user = await AsyncStorage.getItem('userData')
			const parsed = JSON.parse(user)
			this.setState({
				user: parsed,
			})
		}
	}

	render() {
		return (
			<View>
				<ScrollView>
					<CustomHeader title='Profile' />
					<Button
						onPress={() => {
							Alert.alert('Are you sure want to log out?', '', [
								{
									text: 'Cancel',
									onPress: () => console.log('Cancel Pressed'),
									style: 'cancel',
								},
								{
									text: 'OK',
									onPress: async () => {
										try {
											await AsyncStorage.removeItem('userData')
											await AsyncStorage.removeItem('userToken')
											this.props.navigation.navigate('AuthScreen')
										} catch (error) {
											console.log(error)
										}
									},
								},
							])
						}}>
						<Text>Log Out</Text>
					</Button>
					<Button
						onPress={() => {
							ToastAndroid.show('ini toast', ToastAndroid.SHORT)
						}}>
						<Text>Toast</Text>
					</Button>

					<View>
						<Text>{this.state.user.name}</Text>
					</View>
				</ScrollView>
			</View>
		)
	}
}

export default Profile
