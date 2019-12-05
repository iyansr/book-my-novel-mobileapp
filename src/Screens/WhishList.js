import React, { Component } from 'react'
import {
	Text,
	View,
	ScrollView,
	Image,
	StyleSheet,
	ActivityIndicator,
	ToastAndroid,
} from 'react-native'
import CustomHeader from '../Components/Header/Header'
import WhishListItem from '../Components/Home/WhishList'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import jwt_decode from 'jwt-decode'

class WhishList extends Component {
	constructor() {
		super()
		this.state = {
			whishData: [],
			isLoading: true,
		}
	}

	async getWhishList() {
		try {
			const token = await AsyncStorage.getItem('userToken')
			const decoded = await jwt_decode(token)
			const userId = decoded.user_id
			const response = await Axios.get(
				`https://bookmynovel-api.herokuapp.com/api/v2/whishlist/${userId}`,
				{
					headers: {
						Authorization: 'bearer ' + token,
					},
				}
			)
			this.setState({
				whishData: response.data,
				isLoading: false,
			})
		} catch (error) {
			console.log(error)
		}
	}

	async removeWhishlist(whishId) {
		try {
			//
			const token = await AsyncStorage.getItem('userToken')
			const decoded = await jwt_decode(token)
			const userId = decoded.user_id
			await Axios.delete(
				`https://bookmynovel-api.herokuapp.com/api/v2/whishlist/delete/whish?whish_id=${whishId}&user_id=${userId}`,
				{
					headers: {
						Authorization: 'bearer ' + token,
					},
				}
			)
			ToastAndroid.show('Succes Remove Favourite', ToastAndroid.SHORT)
			this.getWhishList()
		} catch (error) {
			ToastAndroid.show('Error', ToastAndroid.SHORT)
			console.log(error.response.data)
		}
	}

	componentDidMount() {
		this.getWhishList()
	}

	render() {
		if (this.state.isLoading) {
			return (
				<>
					<CustomHeader
						title='Favourite'
						showLeft={true}
						leftIcon='chevron-left'
						buttonLeftPress={() => this.props.navigation.goBack()}
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
			return this.state.whishData.length !== 0 ? (
				<View>
					<CustomHeader
						title='Favourite'
						showLeft={true}
						leftIcon='chevron-left'
						buttonLeftPress={() => this.props.navigation.goBack()}
						showRight={true}
						rightIcon='autorenew'
						buttonRightPress={() => {
							this.setState({ isLoading: true })
							this.getWhishList()
						}}
					/>
					<ScrollView
						contentContainerStyle={{ padding: 12 }}
						showsVerticalScrollIndicator={false}>
						<WhishListItem
							data={this.state.whishData}
							unFavourite={(noveId, wishId) => this.removeWhishlist(wishId)}
						/>
					</ScrollView>
				</View>
			) : (
				<>
					<CustomHeader
						title='Favourite'
						showLeft={true}
						leftIcon='chevron-left'
						buttonLeftPress={() => this.props.navigation.goBack()}
						showRight={true}
						rightIcon='autorenew'
						buttonRightPress={() => {
							this.setState({ isLoading: true })
							this.getWhishList()
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
								Looks like you didn't have any favourite yet
							</Text>
							<Text
								style={styles.emptyLink}
								onPress={() => this.props.navigation.navigate('Home')}>
								Explore Novel
							</Text>
						</View>
					</View>
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

export default WhishList
