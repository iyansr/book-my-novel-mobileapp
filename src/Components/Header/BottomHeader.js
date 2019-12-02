import React, { Component } from 'react'
import { Right, Button, Left, Icon } from 'native-base'
import { Text, View } from 'react-native'
import { headerStyle as style } from './style'

class BottomHeader extends Component {
	render() {
		return (
			<View style={style.bottomHeader}>
				<Button onPress={this.props.onPress} style={style.bottomHeaderButon}>
					<Left>
						<Icon
							type='FontAwesome'
							name='search'
							style={{
								color: '#4a148c',
								fontWeight: 'bold',
								fontSize: 16,
								marginLeft: 10,
							}}
						/>
					</Left>
					<Text
						style={{
							marginLeft: -200,
							color: '#757575',
							fontFamily: 'Poppins-Regular',
						}}>
						Search...
					</Text>
					<Right></Right>
				</Button>
			</View>
		)
	}
}

export default BottomHeader
