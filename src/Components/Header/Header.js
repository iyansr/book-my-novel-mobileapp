import React, { Component } from 'react'
import { Header, Body, Title, Right, Icon, Button, Left } from 'native-base'
import { StatusBar, Text, View } from 'react-native'
import { headerStyle as style } from './style'
import BottomHeader from './BottomHeader'

class CustomHeader extends Component {
	render() {
		const { header, headerTitle } = style
		const { showLeft, showRight } = this.props
		return (
			<>
				<Header style={header}>
					<StatusBar barStyle='light-content' backgroundColor='#4a148c' />
					{showLeft ? (
						<Left>
							<Button transparent onPress={this.props.buttonLeftPress}>
								<Icon
									type='FontAwesome'
									name={this.props.leftIcon}
									style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
								/>
							</Button>
						</Left>
					) : null}

					<Body>
						<Title style={headerTitle}>{this.props.title}</Title>
					</Body>
					<Right>
						{showRight ? (
							<Button transparent onPress={this.props.buttonRightPress}>
								<Icon
									type='FontAwesome5'
									name={this.props.rightIcon}
									style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
								/>
							</Button>
						) : null}
					</Right>
				</Header>
			</>
		)
	}
}

export default CustomHeader
