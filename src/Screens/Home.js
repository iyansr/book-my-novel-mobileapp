import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import Genre from '../Components/Home/Genre'
import SectionTitle from '../Components/Home/SectionTitle'
import Popular from '../Components/Home/Popular'
import AllNovel from '../Components/Home/AllNovel'
import Axios from 'axios'
import BottomHeader from '../Components/Header/BottomHeader'

class Home extends Component {
	state = {
		genres: ['Fantasy', 'Action', 'Romance'],
		data: [],
		dataPopular: [],
		isLoading: true,
	}

	getAllNovel = async () => {
		try {
			const response = await Axios.get(
				'https://stormy-eyrie-12807.herokuapp.com/api/v2/novel?limit=100&page=1'
			)
			this.setState({
				data: response.data.result,
				isLoading: false,
			})
		} catch (error) {
			console.log(error)
		}
	}
	getPopularNovel = async () => {
		try {
			const response = await Axios.get(
				'https://stormy-eyrie-12807.herokuapp.com/api/v2/novel?limit=4&page=2'
			)
			this.setState({
				dataPopular: response.data.result,
				isLoading: false,
			})
		} catch (error) {
			console.log(error)
		}
	}
	componentDidMount = () => {
		this.getAllNovel()
		this.getPopularNovel()
	}

	render() {
		if (this.state.isLoading) {
			return (
				<>
					<BottomHeader />
					<Text>Loading...</Text>
				</>
			)
		}
		return (
			<View>
				<BottomHeader
					onPress={() => {
						this.props.navigation.navigate('Search')
						console.log('ini Search')
					}}
				/>
				<ScrollView
					contentContainerStyle={{ padding: 12 }}
					showsVerticalScrollIndicator={false}>
					<Genre genres={this.state.genres} />
					<SectionTitle showLink={true} title='Popular Books' />
					<Popular
						data={this.state.dataPopular}
						onPress={(id, title, author, description, image) => {
							console.log({ id, title, author, description, image })
							this.props.navigation.navigate('Details', {
								id,
								title,
								author,
								description,
								image,
							})
						}}
					/>

					<SectionTitle showLink={false} title='All Books' />

					<AllNovel
						data={this.state.data}
						onPress={(id, title, author, description, image) => {
							console.log({ id, title, author, description, image })
							this.props.navigation.navigate('Details', {
								id,
								title,
								author,
								description,
								image,
							})
						}}
					/>
					<View style={{ marginTop: 60 }}></View>
				</ScrollView>
			</View>
		)
	}
}

export default Home
