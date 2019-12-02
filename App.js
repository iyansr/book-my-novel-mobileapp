import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import Home from './src/Screens/Home'
import CustomHeader from './src/Components/Header/Header'
import Profile from './src/Screens/Profile'
import { Icon } from 'native-base'
import History from './src/Screens/History'
import Details from './src/Screens/Details'

const HomeNavigator = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: () => ({
			header: () => <CustomHeader title='BookMyNovel' />,
		}),
	},
	Details: {
		screen: Details,
	},
})

const BottomNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeNavigator,
			navigationOptions: {
				tabBarLabel: 'Explore',
				tabBarIcon: ({ tintColor }) => (
					<Icon type='FontAwesome' name='compass' style={{ fontSize: 23 }} />
				),
			},
		},
		History: {
			screen: History,
			navigationOptions: {
				tabBarLabel: 'History',
				tabBarIcon: ({ tintColor }) => (
					<Icon type='FontAwesome' name='history' style={{ fontSize: 23 }} />
				),
			},
		},
		Profile: {
			screen: Profile,
			navigationOptions: {
				tabBarLabel: 'Profile',
				tabBarIcon: ({ tintColor }) => (
					<Icon type='FontAwesome' name='user' style={{ fontSize: 23 }} />
				),
			},
		},
	},
	{
		tabBarOptions: {
			activeTintColor: '#6B52AE',
			inactiveTintColor: 'grey',
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

export default createAppContainer(BottomNavigator)
