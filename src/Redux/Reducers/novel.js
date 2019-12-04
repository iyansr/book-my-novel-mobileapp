const initState = {
	novelData: [],
	error: false,
	isLoading: false,
	isRejected: false,
	isFulfilled: false,
}

export const novels = (prevstate = initState, action) => {
	switch (action.type) {
		case 'GET_NOVELS_PENDING':
			return {
				...prevstate,
				isLoading: true,
				isRejected: false,
				isFulfilled: false,
			}
		case 'GET_NOVELS_REJECTED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: true,
				error: true,
			}
		case 'GET_NOVELS_FULFILLED':
			return {
				...prevstate,
				isLoading: false,
				isRejected: false,
				isFulfilled: true,
				error: false,
				novelData: action.payload.data.result,
			}

		default:
			return prevstate
	}
}
