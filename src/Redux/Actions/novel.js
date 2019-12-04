import Axios from 'axios'

export const getAllNovels = (query = '') => {
	return {
		type: 'GET_NOVELS',
		payload: Axios.get(
			`https://bookmynovel-api.herokuapp.com/api/v2/novel${query}`
		),
	}
}
