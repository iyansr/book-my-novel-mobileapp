import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
} from 'react-native'
import { Badge } from 'native-base'
import StarRating from 'react-native-star-rating'

export class AllNovel extends Component {
	render() {
		const { mainContainer, imageContainer, image } = styles
		return (
			<>
				{this.props.data.map((da, index) => {
					return (
						<View
							key={index}
							style={{
								paddingHorizontal: 0,
								marginTop: 0,
								justifyContent: 'space-around',
							}}>
							<View style={mainContainer}>
								<View style={imageContainer}>
									<TouchableHighlight
										style={{ borderRadius: 5 }}
										onPress={() =>
											this.props.onPress(
												da.novel_id,
												da.title,
												da.author,
												da.description,
												da.image
											)
										}>
										<Image
											style={image}
											source={{
												uri: da.image,
											}}
										/>
									</TouchableHighlight>
								</View>
								<View
									style={{
										marginLeft: 16,
										flexDirection: 'column',
									}}>
									<Text
										onPress={() =>
											this.props.onPress(
												da.novel_id,
												da.title,
												da.author,
												da.description,
												da.image
											)
										}
										numberOfLines={2}
										ellipsizeMode='tail'
										style={{
											fontFamily: 'Poppins-Bold',
											width: Dimensions.get('window').width - 160,
											fontSize: 15,
										}}>
										{da.title}
									</Text>
									<View style={{ width: 60, marginTop: 5 }}>
										<StarRating
											disable={true}
											maxStars={5}
											rating={4}
											starSize={15}
											fullStarColor='#F3AC13'
											emptyStarColor='#98A0B3'
										/>
									</View>

									<Text
										numberOfLines={1}
										ellipsizeMode={'tail'}
										style={{
											width: 120,
											marginTop: 5,
											fontSize: 12,
											color: '#98A0B3',
											fontFamily: 'Poppins-Regular',
										}}>
										{da.author}
									</Text>
									<View style={{ flexDirection: 'row', marginTop: 10 }}>
										<Badge
											style={{
												height: 16,
												backgroundColor:
													da.Status === 'Available' ? '#00C853' : '#F48FB1',
											}}>
											<Text
												style={{
													fontSize: 12,
													color: 'white',
													fontFamily: 'Poppins-Regular',
												}}>
												{da.Status}
											</Text>
										</Badge>
										<Badge
											style={{
												marginLeft: 10,
												height: 16,
												backgroundColor: '#4a148c',
											}}>
											<Text
												style={{
													fontSize: 12,
													color: 'white',
													fontFamily: 'Poppins-Regular',
												}}>
												{da.Genre}
											</Text>
										</Badge>
									</View>
								</View>
							</View>
						</View>
					)
				})}
			</>
		)
	}
}
const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		height: 170,
		width: '100%',
		backgroundColor: 'white',
		alignContent: 'center',
		padding: 5,
		flexDirection: 'row',
	},
	imageContainer: {
		height: 150,
		width: 100,
		elevation: 10,
		borderRadius: 5,
	},
	image: {
		height: 150,
		width: 100,
		resizeMode: 'cover',
		borderRadius: 5,
	},
})

export default AllNovel
