import React, { Component } from 'react'
import { Container, Button } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { Text, View, ScrollView } from 'react-native'
import CustomHeader from '../Components/Header/Header'

class Profile extends Component {
	render() {
		return (
			<View>
				<ScrollView>
					<CustomHeader title='Profile' />
					<Button
						onPress={async () => {
							try {
								await AsyncStorage.removeItem('userToken')
								this.props.navigation.navigate('AuthScreen')
							} catch (error) {
								console.log(error)
							}
						}}>
						<Text>Log Out</Text>
					</Button>
				</ScrollView>
			</View>
		)
	}
}

export default Profile
