import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Right } from 'native-base'

export class SectionTitle extends Component {
	render() {
		const { showLink, onPress, title } = this.props
		const { mainTitle, link } = styles
		return (
			<View style={{ flexDirection: 'row' }}>
				<Text style={mainTitle}>{title}</Text>
				{showLink ? (
					<Right>
						<Text onPress={onPress} style={link}>
							See More
						</Text>
					</Right>
				) : null}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	mainTitle: {
		flex: 2,
		marginLeft: 5,
		marginTop: 20,
		marginBottom: 10,
		fontSize: 18,
		fontFamily: 'Poppins-Bold',
		color: '#4B4C72',
	},
	link: {
		flex: 1,
		marginTop: 20,
		marginBottom: 10,
		marginRight: 10,
		fontSize: 14,
		fontFamily: 'Poppins-Bold',
		color: '#4a148c',
	},
})

export default SectionTitle
