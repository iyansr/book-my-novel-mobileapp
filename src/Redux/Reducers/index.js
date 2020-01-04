import { combineReducers } from 'redux'
import { novels } from './novel'
import { user } from './user'

const appReducers = combineReducers({
	novels,
	user,
})

export default appReducers
