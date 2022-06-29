import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './Reducer'


const store=createStore(userReducer,applyMiddleware(thunk))

export default store