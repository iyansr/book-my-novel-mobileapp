import React from 'react'
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native'

const Genre = ({ genres }) => {
	const { cardStyle, textStyle } = styles

	const genreData = [
		{
			genre: 'Adventure',
			image:
				'https://res.cloudinary.com/iyansrcloud/image/upload/v1575294035/upload/genre-icon/action_f1yk4m.png',
			color: '#8373dd',
			textColor: '#28304f',
		},
		{
			genre: 'Comedy',
			image:
				'https://res.cloudinary.com/iyansrcloud/image/upload/v1575295609/upload/genre-icon/comedy_io7bh2.png',
			color: '#91d5ff',
			textColor: '#4a148c',
		},
		{
			genre: 'Horror',
			image:
				'https://res.cloudinary.com/iyansrcloud/image/upload/v1575296515/upload/genre-icon/horror_gx3q2x.png',
			color: '#28304f',
			textColor: '#8373dd',
		},
		{
			genre: 'Sci-Fi',
			image:
				'https://res.cloudinary.com/iyansrcloud/image/upload/v1575296754/upload/genre-icon/sci-fi_yqrxi8.png',
			color: '#28304f',
			textColor: '#8373dd',
		},
	]

	return (
		<ScrollView
			showsHorizontalScrollIndicator={false}
			horizontal={true}
			contentContainerStyle={{
				marginTop: 0,
				paddingVertical: 10,
			}}>
			{genreData.map((genre, index) => {
				return (
					<View
						key={index}
						style={[cardStyle, { backgroundColor: genre.color }]}>
						<Text style={[textStyle, { color: genre.textColor }]}>
							{genre.genre}
						</Text>
						<View>
							<Image
								source={{
									uri: genre.image,
								}}
								style={{
									marginLeft: 120,
									height: 100,
									width: 100,
									resizeMode: 'cover',
									opacity: 0.8,
								}}
							/>
						</View>
					</View>
				)
			})}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	cardStyle: {
		padding: 20,
		alignContent: 'center',
		alignItems: 'center',
		height: 115,
		width: 240,
		marginRight: 20,
		borderRadius: 10,
		flexDirection: 'row',
		elevation: 8,
	},
	textStyle: {
		position: 'absolute',
		marginLeft: 20,
		flex: 1,
		alignItems: 'center',
		fontFamily: 'Poppins-Bold',
		fontSize: 20,
	},
})

export default Genre
