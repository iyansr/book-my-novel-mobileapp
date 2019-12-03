import React, { Component } from 'react'
import {
	Container,
	Header,
	Content,
	Form,
	Item,
	Input,
	Label,
	Button,
	Text,
	Icon,
} from 'native-base'
import { View, TextInput, ScrollView, StatusBar } from 'react-native'
class Register extends Component {
	render() {
		return (
			<View
				style={{
					alignSelf: 'center',
					width: '87%',
					justifyContent: 'center',
					flexDirection: 'column',
					flex: 1,
				}}>
				<StatusBar barStyle='dark-content' backgroundColor='white' />
				<View style={{ marginBottom: 30 }}>
					<Text
						style={{
							fontSize: 24,
							fontFamily: 'Poppins-Bold',
							color: '#4B4C72',
						}}>
						Welcome
					</Text>
					<Text
						style={{
							fontSize: 24,
							fontFamily: 'Poppins-Bold',
							color: '#4B4C72',
						}}>
						New User !
					</Text>
				</View>
				<View style={{ marginTop: -20 }}>
					<Form>
						<Item floatingLabel style={{ marginLeft: 0 }}>
							<Label style={{ fontFamily: 'Poppins-Regular' }}>Name</Label>
							<Input />
						</Item>
						{/* <Text>asd</Text> */}
						<Item floatingLabel style={{ marginLeft: 0 }}>
							<Label style={{ fontFamily: 'Poppins-Regular' }}>Email</Label>
							<Input />
						</Item>
						{/* <Text>asd</Text> */}
						<Item floatingLabel style={{ marginLeft: 0 }}>
							<Label style={{ fontFamily: 'Poppins-Regular' }}>Password</Label>
							<Input />
						</Item>
					</Form>
				</View>
				<View
					style={{
						marginTop: 80,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<Text
						style={{
							fontSize: 18,
							fontFamily: 'Poppins-Bold',
							marginTop: 16,
							color: '#4B4C72',
						}}>
						Sign Up
					</Text>
					<Button
						onPress={() => this.props.navigation.navigate('App')}
						rounded
						style={{
							height: 54,
							width: 54,
							paddingLeft: 4,
							backgroundColor: '#4B4C72',
						}}>
						<Icon type='FontAwesome' name='chevron-right' />
					</Button>
				</View>
				<View
					style={{
						marginTop: 60,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					<Text
						onPress={() => this.props.navigation.replace('Login')}
						style={{
							fontSize: 13,
							fontFamily: 'Poppins-Regular',
							marginTop: 16,
							color: '#4B4C72',
							textDecorationLine: 'underline',
						}}>
						Sign In
					</Text>
				</View>
			</View>
		)
	}
}

export default Register
