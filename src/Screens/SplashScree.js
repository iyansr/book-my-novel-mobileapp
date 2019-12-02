import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const FIVE_SECONDS = 3000

export default class SplashScreen extends React.Component {
	componentDidMount() {
		// When mounted, wait one second, then navigate to App
		setTimeout(() => {
			// Components that are placed inside a React Navigation
			// navigator will receive the `navigation` prop.
			// It's main usage is to trigger navigation events.
			// Right here we're telling it to navigate to the route
			// with the name 'App'.
			this.props.navigation.navigate('App')
		}, FIVE_SECONDS)
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<ActivityIndicator size='large' color='#0000ff' />
			</View>
		)
	}
}
