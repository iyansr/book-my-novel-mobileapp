import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Home from './src/Screens/Home'
import CustomHeader from './src/Components/Header/Header'
import Profile from './src/Screens/Profile'
import { Icon } from 'native-base'
import History from './src/Screens/History'
import Details from './src/Screens/Details'
import SplashScreen from './src/Screens/SplashScreen'
import SearchScreen from './src/Screens/Search'

const HomeNavigator = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: () => ({
			header: () => <CustomHeader title='BookMyNovel' />,
		}),
	},
	Details: {
		screen: Details,
		navigationOptions: () => ({
			header: null,
		}),
	},
	Search: { screen: SearchScreen },
})

const BottomNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeNavigator,
			navigationOptions: {
				tabBarLabel: 'Explore',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						type='FontAwesome'
						name='compass'
						style={{ color: tintColor, fontSize: 23 }}
					/>
				),
			},
		},
		History: {
			screen: History,
			navigationOptions: {
				tabBarLabel: 'History',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						type='FontAwesome'
						name='history'
						style={{ color: tintColor, fontSize: 23 }}
					/>
				),
			},
		},
		Profile: {
			screen: Profile,
			navigationOptions: {
				tabBarLabel: 'Profile',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						type='FontAwesome'
						name='user'
						style={{ color: tintColor, fontSize: 23 }}
					/>
				),
			},
		},
	},
	{
		tabBarOptions: {
			activeTintColor: '#4a148c',
			inactiveTintColor: '#757575',
			style: {
				backgroundColor: 'white',
				borderTopWidth: 0,
				shadowOffset: { width: 5, height: 3 },
				shadowColor: 'black',
				shadowOpacity: 0.5,
				elevation: 5,
			},
		},
	}
)

const switchScreen = createSwitchNavigator({
	Splash: SplashScreen,
	App: BottomNavigator,
})

export default createAppContainer(switchScreen)
