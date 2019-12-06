import React, { Component } from 'react'
import { Container } from 'native-base'
import {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
	Keyboard,
	ActivityIndicator,
} from 'react-native'
import SearchBar from '../Components/Header/SearchBar'
import { connect } from 'react-redux'
import { getAllNovels } from '../Redux/Actions/novel'
import CustomHeader from '../Components/Header/Header'
import AllNovel from '../Components/Home/AllNovel'

class SearchScreen extends Component {
	constructor() {
		super()
		this.state = {
			searchVal: '',
			isLoading: false,
			searchData: [],
			isEmpty: true,
			userId: '',
			autoFocus: true,
		}
	}
	async onSearch() {
		console.log(this.state.searchVal)
		Keyboard.dismiss()
		this.setState({
			isLoading: true,
		})
		try {
			await this.props.dispatch(getAllNovels(`?title=${this.state.searchVal}`))
			this.setState({
				autoFocus: false,
				searchData: this.props.novels.novelData,
				isLoading: false,
				isEmpty: false,
			})
		} catch (error) {
			this.setState({
				isLoading: false,
				isEmpty: true,
				autoFocus: false,
			})
		}
	}

	componentDidMount() {
		this.setState({
			userId: this.props.navigation.getParam('userId'),
		})
	}

	render() {
		console.log(this.state.userId)
		if (this.state.isLoading) {
			return (
				<>
					<CustomHeader title='Search' />
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
			<>
				<SearchBar
					autoFocus={this.state.autoFocus}
					onChange={search => this.setState({ searchVal: search })}
					onSearch={this.onSearch.bind(this)}
				/>
				<ScrollView
					contentContainerStyle={{ padding: 12, backgroundColor: 'white' }}
					showsVerticalScrollIndicator={false}>
					{this.state.isEmpty ? (
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'white',
								marginTop: 100,
							}}>
							<Image
								source={{
									uri:
										'https://res.cloudinary.com/iyansrcloud/image/upload/v1575381109/empty_state_kyd2jn.jpg',
								}}
								style={{ height: 300, width: 300, marginTop: 0 }}
							/>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: 'white',
								}}>
								<Text style={styles.emptyText}>Upss..</Text>
								<Text style={styles.emptyText}>Cannot find any novel</Text>
							</View>
						</View>
					) : (
						<AllNovel
							data={this.state.searchData}
							onPress={data => {
								this.props.navigation.navigate('Details', {
									data,
									userId: this.state.userId,
								})
							}}
						/>
					)}

					<View style={{ marginTop: 60 }}></View>
				</ScrollView>
			</>
		)
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
		novels: state.novels,
	}
}

export default connect(mapStateToProps)(SearchScreen)
