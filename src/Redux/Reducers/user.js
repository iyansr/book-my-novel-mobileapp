import AsyncStorage from '@react-native-community/async-storage'
import jwt_decode from 'jwt-decode'
const initState = {
	userToken: {},
	error: {},
	isLoading: false,
	isRejected: false,
	isFulfilled: false,
	borrowData: [],
}

export const user = (prevstate = initState, action) => {
	switch (action.type) {
		case 'LOGIN_PENDING':
			return {
				...prevstate,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,
			}
		case 'LOGIN_REJECTED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: true,
				error: action.payload.response.data,
			}
		case 'LOGIN_FULFILLED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: false,
				isFulfilled: true,
				error: {},
				userToken: action.payload.data,
			}
		case 'REGISTER_PENDING':
			return {
				...prevstate,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,
			}
		case 'REGISTER_REJECTED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: true,
				error: action.payload.response.data,
			}
		case 'REGISTER_FULFILLED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: false,
				isFulfilled: true,
			}
		case 'GET_BORROW_PENDING':
			return {
				...prevstate,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,
			}
		case 'GET_BORROW_REJECTED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: true,
				error: action.payload.response.data,
			}
		case 'GET_BORROW_FULFILLED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: false,
				isFulfilled: true,
				borrowData: action.payload.data.borrow,
			}
		case 'RETURN_BORROW_PENDING':
			return {
				...prevstate,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,
			}
		case 'RETURN_BORROW_REJECTED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: true,
				error: action.payload.response.data,
			}
		case 'RETURN_BORROW_FULFILLED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: false,
				isFulfilled: true,
			}

		default:
			return prevstate
	}
}
