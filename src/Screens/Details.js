import React, { Component } from 'react'
import {
	View,
	Text,
	StatusBar,
	Image,
	ImageBackground,
	Dimensions,
	StyleSheet,
} from 'react-native'
import { Button, Icon, Fab } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
class Details extends Component {
	static navigationOptions = {
		tabBarVisible: false,
		header: null,
	}
	state = {
		data: this.props.navigation.getParam('data'),
	}
	render() {
		const {
			Genre,
			Status,
			author,
			createdAt,
			description,
			height,
			image,
			isbn,
			length,
			novel_id,
			pages,
			title,
			vendor,
			weight,
		} = this.state.data
		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<ImageBackground
					source={{ uri: image }}
					style={{
						backgroundColor: 'black',
						width: '100%',
						height: 250,
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}>
					<Button transparent onPress={() => this.props.navigation.goBack()}>
						<Icon
							type='FontAwesome'
							name='chevron-left'
							style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
						/>
					</Button>
					<View>
						<Text style={styles.bigTitle}>{title}</Text>
						<Text
							style={{
								fontSize: 13,
								color: 'white',
								marginLeft: 12,
								fontFamily: 'Poppins-Bold',
								width: '60%',
							}}>
							{author}
						</Text>
					</View>
				</ImageBackground>
				<View
					style={{
						flex: 1,
						flexDirection: 'row-reverse',
						marginTop: -140,
						padding: 20,
					}}>
					<View
						style={{
							height: 150,
							width: 100,
							elevation: 10,
							borderRadius: 5,
							justifyContent: 'flex-end',
						}}>
						<Image
							source={{ uri: image }}
							style={{
								height: 150,
								width: 100,
								resizeMode: 'cover',
								borderRadius: 5,
							}}
						/>
					</View>
				</View>
				<View style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 15 }}>
					<Text
						style={{
							fontFamily: 'Poppins-Regular',
							textAlign: 'justify',
							lineHeight: 16,
						}}>
						{description}
					</Text>
				</View>
				<View
					style={{
						justifyContent: 'center',
						alignContent: 'center',
						alignItems: 'center',
						alignSelf: 'center',
					}}>
					<View
						style={[
							styles.detailContainer,
							{ borderBottomWidth: 1, borderBottomColor: '#757575' },
						]}>
						<Text style={[styles.boldFont, { fontSize: 18 }]}>Details : </Text>
					</View>

					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Published</Text>
						<Text>{createdAt}</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Pages</Text>
						<Text>{pages}</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>ISBN</Text>
						<Text>{isbn}</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Publisher</Text>
						<Text>{vendor}</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Weight</Text>
						<Text>{weight} Kg</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Height</Text>
						<Text>{height} Kg</Text>
					</View>
					<View style={styles.detailContainer}>
						<Text style={styles.boldFont}>Length</Text>
						<Text>{length} Kg</Text>
					</View>
				</View>

				<View
					style={{
						paddingHorizontal: 80,
						paddingVertical: 20,
					}}>
					<Button
						style={{
							borderRadius: 50,
							alignContent: 'center',
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: '#4a148c',
							elevation: 8,
						}}>
						<Text style={{ fontFamily: 'Poppins-Bold', color: 'white' }}>
							Borrow
						</Text>
					</Button>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	boldFont: {
		fontFamily: 'Poppins-Bold',
	},
	detailContainer: {
		alignItems: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		marginTop: 5,
		width: Dimensions.get('window').width / 1.3,
		justifyContent: 'space-between',
	},
	bigTitle: {
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		fontSize: 18,
		color: 'white',
		marginLeft: 12,
		fontFamily: 'Poppins-Bold',
		width: '60%',
		marginBottom: 9,
	},
})

export default Details
