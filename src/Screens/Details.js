import React, { Component } from 'react'
import {
	View,
	Text,
	StatusBar,
	Image,
	ImageBackground,
	Dimensions,
	StyleSheet,
	ActivityIndicator,
	Alert,
	ToastAndroid,
} from 'react-native'
import { Button, Icon, Fab } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import { addBorrow, checkBorrow } from '../Redux/Actions/user'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
class Details extends Component {
	static navigationOptions = {
		tabBarVisible: false,
		header: null,
	}

	constructor() {
		super()
		this.state = {
			data: {},
			isLoading: true,
			isBorrowed: false,
			isWhishlised: false,
			userId: '',
			userToken: '',
		}
	}

	async getToken() {
		try {
			const token = await AsyncStorage.getItem('userToken')
			this.setState({
				userToken: token,
			})
		} catch (error) {
			console.log(error)
		}
	}

	async componentDidMount() {
		this.setState({
			userId: this.props.navigation.getParam('userId'),
			data: this.props.navigation.getParam('data'),
			isLoading: false,
		})
		await this.getToken()
		await this.checkBorrowed()
		await this.checkWhishList()
	}

	hanldeBorrow() {
		Alert.alert('Confirm Borrow', 'Are You sure want to borrow this novel?', [
			{
				text: 'Cancel',
				onPress: () => console.log('cancel'),
				style: 'cancel',
			},
			{
				text: 'Confirm',
				onPress: async () => {
					try {
						const userId = this.props.navigation.getParam('userId')
						const userToken = this.state.userToken
						const data = this.props.navigation.getParam('data')
						const idBook = data.novel_id
						let formData = new FormData()
						formData.append('novel_id', idBook)
						ToastAndroid.show('Succes Borrow', ToastAndroid.SHORT)
						await this.props.dispatch(addBorrow(userId, userToken, formData))
						this.checkBorrowed()
					} catch (error) {
						console.log(this.props.user.error)
					}
				},
				style: 'default',
			},
		])
	}

	async checkBorrowed() {
		this.setState({
			isLoading: true,
		})
		try {
			const userId = this.props.navigation.getParam('userId')
			const data = this.props.navigation.getParam('data')
			const userToken = this.state.userToken
			await this.props.dispatch(checkBorrow(userId, data.novel_id, userToken))
			this.setState({
				isBorrowed: this.props.user.isBorrowed,
				isLoading: false,
			})
		} catch (error) {
			this.setState({
				isBorrowed: false,
			})
		}
	}
	async handleWhishlist() {
		if (this.state.isWhishlised) {
			ToastAndroid.show(
				'You already favourite this novel, you can remove from Favourite menu',
				ToastAndroid.LONG
			)
		} else {
			this.setState({
				isWhishlised: true,
			})
			try {
				const userId = this.props.navigation.getParam('userId')
				const data = this.props.navigation.getParam('data')
				const userToken = this.state.userToken
				const formData = new FormData()
				formData.append('novel_id', data.novel_id)
				const response = await Axios.post(
					`https://bookmynovel-api.herokuapp.com/api/v2/whishlist/${userId}`,
					formData,
					{
						headers: {
							Authorization: 'bearer ' + userToken,
						},
					}
				)
				ToastAndroid.show('Added To Favourite', ToastAndroid.SHORT)
				this.setState({
					isWhishlised: response.data,
				})
			} catch (error) {
				console.log(error)
				this.setState({
					isBorrowed: false,
				})
			}
		}
	}

	async checkWhishList() {
		this.setState({
			isLoading: true,
		})
		try {
			const userId = this.props.navigation.getParam('userId')
			const data = this.props.navigation.getParam('data')
			const userToken = this.state.userToken
			// await this.props.dispatch(checkBorrow(userId, data.novel_id, userToken))
			const response = await Axios.get(
				`https://bookmynovel-api.herokuapp.com/api/v2/whishlist/check/whish?user_id=${userId}&novel_id=${data.novel_id}`,
				{
					headers: {
						Authorization: 'bearer ' + userToken,
					},
				}
			)
			this.setState({
				isWhishlised: response.data,
				isLoading: false,
			})
		} catch (error) {
			this.setState({
				isBorrowed: false,
				isLoading: false,
			})
		}
	}

	render() {
		console.log('IS BORROWED', this.state.isBorrowed)
		const {
			Genre,
			Status,
			author,
			createdAt,
			description,
			height,
			image,
			isbn,
			length,
			novel_id,
			pages,
			title,
			vendor,
			weight,
		} = this.state.data
		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<ImageBackground
					source={{ uri: image }}
					style={{
						backgroundColor: 'white',
						width: '100%',
						height: 250,
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Button
							transparent
							style={{ width: 60 }}
							onPress={() => this.props.navigation.goBack()}>
							<Icon
								type='FontAwesome'
								name='chevron-left'
								style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
							/>
						</Button>
						<Button
							transparent
							style={{ width: 60 }}
							onPress={this.handleWhishlist.bind(this)}>
							<Icon
								type='MaterialIcons'
								name='favorite'
								style={{
									color: this.state.isWhishlised ? 'red' : 'grey',
									fontWeight: 'bold',
								}}
							/>
						</Button>
					</View>

					<View>
						<Text style={styles.bigTitle}>{title}</Text>
						<Text
							style={{
								fontSize: 13,
								color: 'white',
								marginLeft: 12,
								fontFamily: 'Poppins-Bold',
								width: '60%',
							}}>
							{author}
						</Text>
					</View>
				</ImageBackground>
				<View
					style={{
						flex: 1,
						flexDirection: 'row-reverse',
						marginTop: -140,
						padding: 20,
					}}>
					<View
						style={{
							height: 150,
							width: 100,
							elevation: 10,
							borderRadius: 5,
							justifyContent: 'flex-end',
							backgroundColor: 'white',
						}}>
						<Image
							source={{ uri: image }}
							style={{
								height: 150,
								width: 100,
								resizeMode: 'cover',
								borderRadius: 5,
							}}
						/>
					</View>
				</View>
				<View style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 15 }}>
					<Text
						style={{
							fontFamily: 'Poppins-Regular',
							textAlign: 'justify',
							lineHeight: 16,
						}}>
						{description}
					</Text>
				</View>
				<View
					style={{
						justifyContent: 'center',
						alignContent: 'center',
						alignItems: 'center',
						alignSelf: 'center',
					}}>
					<View
						style={[
							styles.detailContainer,
							{ borderBottomWidth: 1, borderBottomColor: '#757575' },
						]}>
						<Text style={[styles.boldFont, { fontSize: 18 }]}>Details : </Text>
					</View>

					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Published</Text>
						<Text>{createdAt}</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Pages</Text>
						<Text>{pages}</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>ISBN</Text>
						<Text>{isbn}</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Publisher</Text>
						<Text>{vendor}</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Weight</Text>
						<Text>{weight} Kg</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Height</Text>
						<Text>{height} Kg</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Length</Text>
						<Text>{length} Kg</Text>
					</View>
				</View>

				<View
					style={{
						paddingHorizontal: 50,
						paddingVertical: 20,
					}}>
					{this.state.isLoading ? (
						<ActivityIndicator size='small' color='#4a148c' />
					) : Status === 'Empty' || this.state.isBorrowed ? (
						<Button
							disabled
							style={{
								borderRadius: 50,
								alignContent: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#dedede',
								elevation: 0,
							}}>
							{this.state.isBorrowed ? (
								<Text style={{ fontFamily: 'Poppins-Bold', color: 'black' }}>
									You Already Borrow This Novel
								</Text>
							) : (
								<Text style={{ fontFamily: 'Poppins-Bold', color: 'black' }}>
									Novel Is Empty
								</Text>
							)}
						</Button>
					) : (
						<Button
							onPress={this.hanldeBorrow.bind(this)}
							style={{
								borderRadius: 50,
								alignContent: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#4a148c',
								elevation: 8,
							}}>
							<Text style={{ fontFamily: 'Poppins-Bold', color: 'white' }}>
								Borrow
							</Text>
						</Button>
					)}
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	boldFont: {
		fontFamily: 'Poppins-Bold',
	},
	detailContainer: {
		alignItems: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		marginTop: 5,
		width: Dimensions.get('window').width / 1.3,
		justifyContent: 'space-between',
	},
	bigTitle: {
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		fontSize: 18,
		color: 'white',
		marginLeft: 12,
		fontFamily: 'Poppins-Bold',
		width: '60%',
		marginBottom: 0,
	},
})
const mapStateToProps = state => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(Details)
