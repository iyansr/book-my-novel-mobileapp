import React, { Component } from 'react'
import { Container } from 'native-base'
import {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
	Keyboard,
} from 'react-native'
import SearchBar from '../Components/Header/SearchBar'

class SearchScreen extends Component {
	constructor() {
		super()
		this.state = {
			searchVal: '',
		}
	}
	onSearch() {
		console.log(this.state.searchVal)
		Keyboard.dismiss()
	}
	render() {
		return (
			<>
				<SearchBar
					onChange={search => this.setState({ searchVal: search })}
					onSearch={this.onSearch.bind(this)}
				/>
				<ScrollView>
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
							style={{ height: 300, width: 300, marginTop: -60 }}
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

export default SearchScreen
