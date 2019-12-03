import React, { Component } from 'react'
import { Header, Container, Title, Body } from 'native-base'
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native'
import CustomHeader from '../Components/Header/Header'

class History extends Component {
	constructor() {
		super()
		this.state = {
			isEmpty: true,
		}
	}
	render() {
		return this.state.isEmpty ? (
			<>
				<CustomHeader title='History' />
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'white',
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
						<Text style={styles.emptyText}>
							Looks like you didn't borry any Novel yet
						</Text>
						<Text
							style={styles.emptyLink}
							onPress={() => this.props.navigation.navigate('Home')}>
							Explore Novel
						</Text>
					</View>
				</View>
			</>
		) : (
			<View>
				<ScrollView>
					<CustomHeader title='History' />
				</ScrollView>
			</View>
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

export default History
