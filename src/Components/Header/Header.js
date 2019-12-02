import React, { Component } from 'react'
import { Header, Body, Title, Right, Icon, Button } from 'native-base'
import { StatusBar } from 'react-native'
import { headerStyle as style } from './style'

class CustomHeader extends Component {
	render() {
		const { header, headerTitle } = style
		return (
			<>
				<Header style={header} androidStatusBarColor='#fefefe'>
					<StatusBar barStyle='dark-content' />
					<Body>
						<Title style={headerTitle}>{this.props.title}</Title>
					</Body>
					<Right>
						<Button transparent>
							<Icon
								type='FontAwesome'
								name='search'
								style={{ color: '#11171E', fontWeight: 'bold' }}
							/>
						</Button>
					</Right>
				</Header>
			</>
		)
	}
}

export default CustomHeader
