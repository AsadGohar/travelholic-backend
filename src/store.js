import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { adminLoginReducer, isLoggedInReducer } from './reducers/adminReducers'



const reducer = combineReducers({
    adminLogin: adminLoginReducer,
    isLoggedIn: isLoggedInReducer
})

// const adminInfoFromStorage = sessionStorage.getItem('adminInfo') ? JSON.parse(sessionStorage.getItem('adminInfo')) : null



const initialState = {
    // adminLogin: { adminInfo: adminInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
