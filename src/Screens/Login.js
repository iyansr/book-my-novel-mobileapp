import Axios from 'axios'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

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
import {
	View,
	TextInput,
	ScrollView,
	StatusBar,
	TouchableHighlight,
	ActivityIndicator,
	Keyboard,
} from 'react-native'
class Login extends Component {
	constructor() {
		super()
		this._isMounted = false
		this.CancelToken = Axios.CancelToken
		this.source = this.CancelToken.source()
		this.state = {
			isSecure: true,
			email: '',
			password: '',
			isLoading: false,
			error: {
				error: false,
				message: {
					email: '',
					password: '',
				},
			},
		}
	}

	componentDidMount() {
		this._isMounted = true
	}

	async loginUser() {
		this._isMounted && this.setState({ isLoading: true })
		this._isMounted && Keyboard.dismiss()

		if (this._isMounted) {
			try {
				console.log({
					email: this.state.email,
					password: this.state.password,
				})
				const formData = new FormData()
				formData.append('email', this.state.email)
				formData.append('password', this.state.password)

				const result = await Axios.post(
					'https://stormy-eyrie-12807.herokuapp.com/api/v2/users/login',
					formData,
					{ cancelToken: this.source.token }
				)
				await AsyncStorage.setItem('userToken', result.data)
				this.props.navigation.navigate('App')
				this.setState({ isLoading: false })
			} catch (error) {
				this.setState({
					error: error.response.data,
					isLoading: false,
				})
			}
		} else null
	}

	onSubmit() {
		this._isMounted && this.loginUser()
	}

	componentWillUnmount() {
		this._isMounted = false
		this.source.cancel()
	}

	render() {
		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<View
					style={{
						alignSelf: 'center',
						width: '87%',
						justifyContent: 'center',
						flexDirection: 'column',
						flex: 1,
						marginTop: 100,
					}}>
					<StatusBar barStyle='dark-content' backgroundColor='white' />
					<View style={{ marginBottom: 30 }}>
						<Text
							style={{
								fontSize: 24,
								fontFamily: 'Poppins-Bold',
								color: '#4B4C72',
							}}>
							Here To Get
						</Text>
						<Text
							style={{
								fontSize: 24,
								fontFamily: 'Poppins-Bold',
								color: '#4B4C72',
							}}>
							Welcomed !
						</Text>
					</View>
					<View style={{ marginTop: -20 }}>
						<Form>
							<Item floatingLabel style={{ marginLeft: 0 }}>
								<Label style={{ fontFamily: 'Poppins-Regular' }}>Email</Label>
								<Input
									autoCapitalize='none'
									onChangeText={email => this.setState({ email })}
									keyboardType='email-address'
								/>
							</Item>
							{this.state.error.error ? (
								<Text style={{ fontSize: 13, marginTop: 3, color: 'red' }}>
									{this.state.error.message.email}
								</Text>
							) : null}

							<Item floatingLabel style={{ marginLeft: 0 }}>
								<Label style={{ fontFamily: 'Poppins-Regular' }}>
									Password
								</Label>
								<Input
									autoCapitalize='none'
									secureTextEntry={this.state.isSecure}
									onChangeText={password => this.setState({ password })}
								/>
								<Icon
									onPress={() =>
										this.setState({ isSecure: !this.state.isSecure })
									}
									type='FontAwesome5'
									name={this.state.isSecure ? 'eye-slash' : 'eye'}
									style={{ fontSize: 18, color: '#4B4C72' }}
								/>
							</Item>
							{this.state.error.error ? (
								<Text style={{ fontSize: 13, marginTop: 3, color: 'red' }}>
									{this.state.error.message.password}
								</Text>
							) : null}
						</Form>
					</View>
					<View
						style={{
							marginTop: 50,
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
							Sign In
						</Text>
						<Button
							onPress={this.onSubmit.bind(this)}
							disabled={this.state.isLoading}
							rounded
							style={{
								height: 54,
								width: 54,
								paddingLeft: 8,
								backgroundColor: '#4B4C72',
							}}>
							{this.state.isLoading ? (
								<ActivityIndicator size='large' color='#fff' />
							) : (
								<Icon
									style={{ marginLeft: 12, color: 'white' }}
									type='FontAwesome'
									name='chevron-right'
								/>
							)}
						</Button>
					</View>
					<View
						style={{
							marginTop: 40,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}>
						<View>
							<Text
								onPress={() => this.props.navigation.replace('Register')}
								style={{
									fontSize: 13,
									fontFamily: 'Poppins-Regular',
									marginTop: -15,
									color: '#4B4C72',
									textDecorationLine: 'underline',
								}}>
								Sign Up
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		)
	}
}

export default Login
