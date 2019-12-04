import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../Redux/Actions/user'
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
	ActivityIndicator,
	Alert,
} from 'react-native'
import Axios from 'axios'
class Register extends Component {
	constructor() {
		super()
		this.CancelToken = Axios.CancelToken
		this.source = this.CancelToken.source()
		this._isMount = false
		this.state = {
			isSecure: true,
			name: '',
			email: '',
			password: '',
			isLoading: false,
			error: {
				error: false,
				message: {
					name: '',
					email: '',
					password: '',
				},
			},
		}
	}

	componentDidMount() {
		this._isMount = true
	}

	componentWillUnmount() {
		this._isMount = false

		this.source.cancel()
	}

	async goRegister() {
		this.setState({ isLoading: true })
		try {
			const formData = new FormData()
			formData.append('email', this.state.email)
			formData.append('name', this.state.name)
			formData.append('password', this.state.password)
			await this.props.dispatch(registerUser(formData))
			// this.props.navigation.replace('Login')
			this.setState({
				isLoading: false,
			})
			Alert.alert('Succes Register', 'You can login now', [
				{ text: 'OK', onPress: () => this.props.navigation.replace('Login') },
			])
		} catch (error) {
			this.setState({
				error: this.props.user.error,
				isLoading: false,
			})
		}
	}

	onSubmit() {
		this._isMount && this.goRegister()
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
								<Input onChangeText={name => this.setState({ name })} />
							</Item>
							{this.state.error.error ? (
								<Text style={{ fontSize: 13, marginTop: 3, color: 'red' }}>
									{this.state.error.message.name}
								</Text>
							) : null}
							<Item floatingLabel style={{ marginLeft: 0 }}>
								<Label style={{ fontFamily: 'Poppins-Regular' }}>Email</Label>
								<Input
									autoCapitalize='none'
									onChangeText={email => this.setState({ email })}
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
							Sign Up
						</Text>
						<Button
							onPress={this.onSubmit.bind(this)}
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
						<Text
							onPress={() => this.props.navigation.replace('Login')}
							style={{
								fontSize: 13,
								fontFamily: 'Poppins-Regular',
								marginTop: -15,
								color: '#4B4C72',
								textDecorationLine: 'underline',
							}}>
							Sign In
						</Text>
					</View>
				</View>
			</ScrollView>
		)
	}
}
const mapStateToProps = state => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(Register)
