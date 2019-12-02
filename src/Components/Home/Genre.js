import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

const Genre = ({ genres }) => {
	const { cardStyle, textStyle } = styles

	return (
		<ScrollView
			showsHorizontalScrollIndicator={false}
			horizontal={true}
			contentContainerStyle={{
				marginTop: 10,
				padding: 10,
			}}>
			{genres.map((genre, index) => {
				return (
					<View key={index} style={cardStyle}>
						<Text style={textStyle}>{genre}</Text>
					</View>
				)
			})}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	cardStyle: {
		height: 115,
		width: 240,
		backgroundColor: '#6B52AE',
		marginRight: 20,
		borderRadius: 10,
		flexDirection: 'row',
		elevation: 8,
	},
	textStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default Genre
