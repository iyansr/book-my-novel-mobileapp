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
import Login from './src/Screens/Login'
import Register from './src/Screens/Register'
import BorrowList from './src/Screens/BorrowList'

const HomeNavigator = createStackNavigator({
	Home: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			header: () => (
				<CustomHeader
					leftIcon='bars'
					title='BookMyNovel'
					showRight={true}
					rightIcon='book'
					buttonRightPress={() => navigation.navigate('BorrowPage')}
				/>
			),
		}),
	},
	Details: {
		screen: Details,
		navigationOptions: {
			tabBarVisible: false,
			header: null,
		},
	},
	Search: {
		screen: SearchScreen,
		navigationOptions: {
			header: null,
		},
	},
	BorrowPage: {
		screen: BorrowList,
		navigationOptions: {
			header: null,
		},
	},
})

const BottomNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeNavigator,
			navigationOptions: {
				tabBarLabel: 'Explore',
				tabBarIcon: ({ tintColor }) => (
					<Icon
						type='FontAwesome5'
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
						type='FontAwesome5'
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
						type='FontAwesome5'
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

const AuthNavigator = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
			tabBarVisible: false,
			header: null,
		},
	},
	Register: {
		screen: Register,
		navigationOptions: {
			tabBarVisible: false,
			header: null,
		},
	},
})

const switchScreen = createSwitchNavigator({
	Splash: SplashScreen,
	AuthScreen: AuthNavigator,
	App: BottomNavigator,
})

export default createAppContainer(switchScreen)
