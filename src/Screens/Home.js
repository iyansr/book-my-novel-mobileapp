import React, { Component } from 'react'
import {
	View,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
	ToastAndroid,
} from 'react-native'
import Genre from '../Components/Home/Genre'
import SectionTitle from '../Components/Home/SectionTitle'
import Popular from '../Components/Home/Popular'
import AllNovel from '../Components/Home/AllNovel'
import Axios from 'axios'
import BottomHeader from '../Components/Header/BottomHeader'
import { connect } from 'react-redux'
import { getAllNovels } from '../Redux/Actions/novel'
import AsyncStorage from '@react-native-community/async-storage'

class Home extends Component {
	constructor() {
		super()
		this.CancelToken = Axios.CancelToken
		this.source = this.CancelToken.source()
		this.state = {
			genres: ['Fantasy', 'Action', 'Romance'],
			data: [],
			dataPopular: [],
			isLoading: true,
			userId: '',
			refreshing: false,
		}
	}

	getAllNovel = async () => {
		try {
			await this.props.dispatch(getAllNovels(''))
			this.setState({
				data: this.props.novels.novelData,
				isLoading: false,
			})
		} catch (error) {
			console.log(error)
		}
	}
	getPopularNovel = async () => {
		try {
			await this.props.dispatch(getAllNovels('?limit=4&page=2'))
			this.setState({
				dataPopular: this.props.novels.novelData,
				isLoading: false,
			})
		} catch (error) {
			console.log(error)
		}
	}
	async getUserData() {
		try {
			if (await AsyncStorage.getItem('userData')) {
				const user = await AsyncStorage.getItem('userData')
				const parsed = JSON.parse(user)
				this.setState({
					userId: parsed.user_id,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
	componentDidMount = () => {
		this.getAllNovel()
		this.getPopularNovel()
		this.getUserData()
	}
	componentWillUnmount() {
		this.source.cancel()
	}

	render() {
		if (this.state.isLoading) {
			return (
				<>
					<BottomHeader />
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
		}
		return (
			<View>
				<BottomHeader
					onPress={() => {
						this.props.navigation.navigate('Search', {
							userId: this.state.userId,
						})
						console.log('ini Search')
					}}
				/>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={async () => {
								this.setState({
									refreshing: true,
								})
								try {
									await this.getAllNovel()
									await this.getPopularNovel()
									this.setState({
										refreshing: false,
									})
								} catch (error) {
									ToastAndroid.show('Error', ToastAndroid.SHORT)
								}
							}}
						/>
					}
					contentContainerStyle={{ padding: 12 }}
					showsVerticalScrollIndicator={false}>
					<Genre genres={this.state.genres} />
					<SectionTitle showLink={true} title='Popular Books' />
					<Popular
						data={this.state.dataPopular}
						onPress={data => {
							this.props.navigation.navigate('Details', {
								data,
								userId: this.state.userId,
							})
						}}
					/>

					<SectionTitle showLink={false} title='All Books' />

					<AllNovel
						data={this.state.data}
						onPress={data => {
							this.props.navigation.navigate('Details', {
								data,
								userId: this.state.userId,
							})
						}}
					/>
					<View style={{ marginTop: 60 }}></View>
				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		novels: state.novels,
	}
}

export default connect(mapStateToProps)(Home)
