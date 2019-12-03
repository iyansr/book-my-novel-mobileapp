import React, { Component } from 'react'
import { Container, Button } from 'native-base'
import { Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

class Profile extends Component {
	render() {
		return (
			<Container>
				<Text>Ini Profile</Text>
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
			</Container>
		)
	}
}

export default Profile
