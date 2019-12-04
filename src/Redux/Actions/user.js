import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export const loginUser = data => {
	return {
		type: 'LOGIN',
		payload: Axios.post(
			'https://bookmynovel-api.herokuapp.com/api/v2/users/login',
			data
		),
	}
}
export const registerUser = data => {
	return {
		type: 'REGISTER',
		payload: Axios.post(
			'https://bookmynovel-api.herokuapp.com/api/v2/users/register',
			data
		),
	}
}

export const getBorrow = (userId, token) => {
	return {
		type: 'GET_BORROW',
		payload: Axios.get(
			`https://bookmynovel-api.herokuapp.com/api/v2/borrowlist/${userId}`,
			{
				headers: {
					Authorization: 'bearer ' + token,
				},
			}
		),
	}
}
