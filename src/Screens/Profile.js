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
	Dimensions,
	Image,
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

	logOut() {
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
	}

	render() {
		console.log('USER', this.state.user)
		return (
			<View>
				<CustomHeader
					title='Profile'
					showRight={true}
					rightIcon='exit-to-app'
					buttonRightPress={this.logOut.bind(this)}
				/>
				<ScrollView contentContainerStyle={{ marginHorizontal: 10 }}>
					<View
						style={{
							width: Dimensions.get('window').width,
							alignContent: 'center',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: 10,
						}}>
						<Image
							source={{ uri: this.state.user.avatar }}
							style={{
								height: 200,
								width: 200,
								borderRadius: 200 / 2,
							}}
						/>
					</View>
					<View
						style={{
							width: Dimensions.get('window').width,
							alignContent: 'center',
							alignItems: 'center',
							justifyContent: 'center',
							marginTop: 10,
						}}>
						<View>
							<Text
								style={{
									fontFamily: 'Poppins-Bold',
									fontSize: 18,
								}}>
								{this.state.user.name}
							</Text>
						</View>
						<View>
							<Text
								style={{
									fontFamily: 'Poppins-Regular',
									fontSize: 13,
								}}>
								{this.state.user.email}
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		)
	}
}

export default Profile
