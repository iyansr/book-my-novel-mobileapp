import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Header, Container, Title, Body } from 'native-base'
import {
	Text,
	View,
	ScrollView,
	Image,
	ToastAndroid,
	StyleSheet,
	ActivityIndicator,
	Alert,
} from 'react-native'
import CustomHeader from '../Components/Header/Header'
import { connect } from 'react-redux'
import { getBorrow, returnBorrow } from '../Redux/Actions/user'
import NovelHistory from '../Components/Home/NovelBorrow'

class BorrowList extends Component {
	constructor() {
		super()
		this.state = {
			isEmpty: true,
			isLoading: true,
			BorrowList: [],
			userId: '',
		}
	}

	async getBorrowList() {
		try {
			if (await AsyncStorage.getItem('userData')) {
				const user = await AsyncStorage.getItem('userData')
				const parsed = JSON.parse(user)
				this.setState({
					userId: parsed.user_id,
				})
			}
			const id = this.state.userId
			const token = await AsyncStorage.getItem('userToken')
			await this.props.dispatch(getBorrow(id, token))
			this.setState({
				isLoading: false,
				BorrowList: this.props.user.borrowData,
				isEmpty: false,
			})
		} catch (error) {
			this.setState({ isLoading: false, isEmpty: true })
		}
	}
	async componentDidMount() {
		this.getBorrowList()
	}

	componentWillUnmount() {
		this.setState({ isLoading: false })
	}
	render() {
		if (this.state.isLoading) {
			return (
				<>
					<CustomHeader
						buttonLeftPress={() => this.props.navigation.goBack()}
						leftIcon='chevron-left'
						showLeft={true}
						title='Borrow List'
					/>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<ActivityIndicator size='large' color='#4a148c' />
					</View>
				</>
			)
		} else {
			return this.state.isEmpty ? (
				<>
					<CustomHeader
						buttonLeftPress={() => this.props.navigation.goBack()}
						leftIcon='chevron-left'
						showLeft={true}
						title='Borrow List'
						showRight={true}
						rightIcon='sync-alt'
						buttonRightPress={() => {
							this.setState({ isLoading: true })
							this.getBorrowList()
						}}
					/>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'white',
						}}>
						<Image
							source={{
								uri:
									'https://res.cloudinary.com/iyansrcloud/image/upload/v1575381109/empty_state_kyd2jn.jpg',
							}}
							style={{ height: 300, width: 300, marginTop: -60 }}
						/>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'white',
							}}>
							<Text style={styles.emptyText}>Upss..</Text>
							<Text style={styles.emptyText}>
								Looks like you didn't borry any Novel yet
							</Text>
							<Text
								style={styles.emptyLink}
								onPress={() => this.props.navigation.navigate('Home')}>
								Explore Novel
							</Text>
						</View>
					</View>
				</>
			) : (
				<>
					<CustomHeader
						buttonLeftPress={() => this.props.navigation.goBack()}
						leftIcon='chevron-left'
						showLeft={true}
						rightIcon='sync-alt'
						showRight={true}
						title='Borrow List'
						buttonRightPress={() => {
							this.setState({ isLoading: true })
							this.getBorrowList()
						}}
					/>
					<ScrollView
						contentContainerStyle={{ padding: 12 }}
						showsVerticalScrollIndicator={false}>
						<NovelHistory
							data={this.state.BorrowList}
							onPress={data => {
								ToastAndroid.show(data.title, ToastAndroid.SHORT)
							}}
							returnAction={(novelId, borrow_id) => {
								Alert.alert(
									'Are you sure want to log out?',
									`${novelId} bor: ${borrow_id}`,
									[
										{
											text: 'Cancel',
											onPress: () => console.log('Cancel Pressed'),
											style: 'cancel',
										},
										{
											text: 'OK',
											onPress: async () => {
												// this.setState({ isLoading: true })
												// this.getBorrowList()
												try {
													this.setState({ isLoading: true })
													const formData = new FormData()
													formData.append('borrow_id', borrow_id)
													formData.append('novel_id', novelId)
													const token = await AsyncStorage.getItem('userToken')

													await this.props.dispatch(
														returnBorrow(this.state.userId, formData, token)
													)
													ToastAndroid.show('Succes Return', ToastAndroid.SHORT)
													this.getBorrowList()
												} catch (error) {
													console.log(error.response.data)
												}
											},
										},
									]
								)
							}}
						/>
					</ScrollView>
				</>
			)
		}
	}
}

const styles = StyleSheet.create({
	emptyText: {
		fontFamily: 'Poppins-Bold',
		fontSize: 14,
		color: '#4B4C72',
	},
	emptyLink: {
		fontFamily: 'Poppins-Regular',
		fontSize: 13,
		color: '#4B4C72',
		textDecorationLine: 'underline',
	},
})

const mapStateToProps = state => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(BorrowList)
