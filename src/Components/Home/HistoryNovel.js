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

export class HistoryNovel extends Component {
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
										style={{ borderRadius: 5, backgroundColor: 'white' }}
										onPress={() => this.props.onPress({ ...da })}>
										<Image
											style={image}
											source={{
												uri: da.Novel.image,
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
										onPress={() => this.props.onPress({ ...da })}
										numberOfLines={2}
										ellipsizeMode='tail'
										style={{
											fontFamily: 'Poppins-Bold',
											width: Dimensions.get('window').width - 160,
											fontSize: 15,
											color: '#4B4C72',
										}}>
										{da.Novel.title}
									</Text>
									<View style={{ width: 60, marginTop: 5 }}>
										<StarRating
											disable={true}
											maxStars={5}
											rating={4}
											starSize={12}
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
										{da.Novel.author}
									</Text>
									<View style={{ flexDirection: 'row' }}>
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
											Date Return:
										</Text>
										<Text
											numberOfLines={1}
											ellipsizeMode={'tail'}
											style={{
												width: 120,
												marginTop: 5,
												fontSize: 12,
												color: '#000',
												fontFamily: 'Poppins-Regular',
											}}>
											{da.date_return}
										</Text>
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

export default HistoryNovel
