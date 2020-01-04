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
import HistoryNovel from '../Components/Home/HistoryNovel'
import { borrowHistoryList } from '../Redux/Actions/user'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

class History extends Component {
	constructor() {
		super()
		this.state = {
			isEmpty: true,
			isLoading: true,
			historyList: [],
		}
	}
	async getHistory() {
		try {
			if (await AsyncStorage.getItem('userData')) {
				const token = await AsyncStorage.getItem('userToken')
				const user = await AsyncStorage.getItem('userData')
				const parsed = JSON.parse(user)
				const userId = parsed.user_id
				await this.props.dispatch(borrowHistoryList(userId, token))
				this.setState({
					historyList: this.props.user.historyList,
					isEmpty: false,
					isLoading: false,
				})
			}
		} catch (error) {
			this.setState({
				isEmpty: true,
				isLoading: false,
			})
		}
	}

	componentDidMount() {
		this.getHistory()
	}
	render() {
		if (this.state.isLoading) {
			return (
				<>
					<CustomHeader title='History' />
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
						title='History'
						showRight={true}
						rightIcon='autorenew'
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
								Looks like you didn't borrow any Novel yet
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
				<View>
					<CustomHeader
						title='History'
						showRight={true}
						rightIcon='autorenew'
						buttonRightPress={() => {
							this.setState({ isLoading: true })
							this.getHistory()
						}}
					/>
					<ScrollView
						contentContainerStyle={{ padding: 12, backgroundColor: 'white' }}
						showsVerticalScrollIndicator={false}>
						<HistoryNovel
							data={this.state.historyList}
							onPress={data =>
								ToastAndroid.show(data.Novel.title, ToastAndroid.SHORT)
							}
						/>
						<View style={{ marginTop: 60 }}></View>
					</ScrollView>
				</View>
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

export default connect(mapStateToProps)(History)
