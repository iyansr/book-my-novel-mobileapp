import React, { Component } from 'react'
import { View, Text, StatusBar, Image, ImageBackground } from 'react-native'
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
		console.log('DETAIL', this.state.data)
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
			<ScrollView>
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
						<Text
							style={{
								textShadowColor: 'rgba(0, 0, 0, 0.75)',
								textShadowOffset: { width: -1, height: 1 },
								textShadowRadius: 10,
								fontSize: 18,
								color: 'white',
								marginLeft: 12,
								fontFamily: 'Poppins-Bold',
								width: '60%',
								marginBottom: 9,
							}}>
							{title}
						</Text>
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
				<View style={{ paddingLeft: 20, paddingRight: 20 }}>
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

export default Details
