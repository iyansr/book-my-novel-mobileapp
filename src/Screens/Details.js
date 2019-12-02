import React, { Component } from 'react'
import { View, Text, StatusBar, Image, ImageBackground } from 'react-native'
import { Button, Icon } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
class Details extends Component {
	render() {
		return (
			<ScrollView>
				<StatusBar backgroundColor='#4a148c' />
				<ImageBackground
					source={{ uri: this.props.navigation.getParam('image', '0') }}
					style={{
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
							{this.props.navigation.getParam('title', '0')}
						</Text>
						<Text
							style={{
								fontSize: 13,
								color: 'white',
								marginLeft: 12,
								fontFamily: 'Poppins-Bold',
								width: '60%',
							}}>
							{this.props.navigation.getParam('author', '0')}
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
							source={{ uri: this.props.navigation.getParam('image', '0') }}
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
					<Text style={{ fontFamily: 'Poppins-Regular' }}>
						{this.props.navigation.getParam('description', '0')}
					</Text>
				</View>
			</ScrollView>
		)
	}
}

export default Details
