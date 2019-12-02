import React, { Component } from 'react'
import {
	View,
	Image,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native'
import StarRating from 'react-native-star-rating'

export class Popular extends Component {
	render() {
		const { imageContainer, mainImage, authorText, title } = styles
		return (
			<ScrollView
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				contentContainerStyle={{
					paddingTop: 8,
					paddingBottom: 8,
				}}>
				{this.props.data.map((da, index) => {
					return (
						<View key={index}>
							<TouchableOpacity
								style={imageContainer}
								onPress={() =>
									this.props.onPress(
										da.novel_id,
										da.title,
										da.author,
										da.description,
										da.image
									)
								}>
								<Image style={mainImage} source={{ uri: da.image }} />
							</TouchableOpacity>
							<Text numberOfLines={1} ellipsizeMode={'tail'} style={authorText}>
								{da.author}
							</Text>
							<Text numberOfLines={1} ellipsizeMode={'tail'} style={title}>
								{da.title}
							</Text>
							<View style={{ width: 60, marginLeft: 5 }}>
								<StarRating
									disable={true}
									maxStars={5}
									rating={4}
									starSize={10}
									fullStarColor='#F3AC13'
									emptyStarColor='#98A0B3'
								/>
							</View>
						</View>
					)
				})}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	title: {
		width: 120,
		marginLeft: 5,
		fontSize: 14,
		fontFamily: 'Poppins-Bold',
		color: '#303031',
	},
	imageContainer: {
		height: 180,
		width: 120,
		backgroundColor: 'white',
		marginRight: 20,
		borderRadius: 5,
		flexDirection: 'column',
		flex: 1,
	},
	mainImage: {
		width: 120,
		height: 180,
		borderRadius: 5,
	},
	authorText: {
		width: 120,
		marginTop: 6,
		marginLeft: 5,
		fontSize: 10,
		lineHeight: 12,
		color: '#98A0B3',
		fontFamily: 'Poppins-Regular',
	},
})

export default Popular
