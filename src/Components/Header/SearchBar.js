import React, { Component } from 'react'
import {
	Container,
	Header,
	Item,
	Input,
	Icon,
	Button,
	Text,
	Left,
	Right,
} from 'native-base'
import { StatusBar, Keyboard } from 'react-native'
class SearchBar extends Component {
	render() {
		return (
			<Header searchBar rounded style={{ backgroundColor: '#4a148c' }}>
				<StatusBar barStyle='light-content' backgroundColor='#4a148c' />

				<Item>
					<Input
						placeholder='Search'
						style={{ marginLeft: 10 }}
						autoFocus={true}
						onChangeText={this.props.onChange}
					/>

					<Button transparent onPress={this.props.onSearch}>
						<Icon
							type='FontAwesome5'
							name='search'
							style={{ fontSize: 18, color: '#4a148c' }}
						/>
					</Button>
				</Item>
			</Header>
		)
	}
}

export default SearchBar
