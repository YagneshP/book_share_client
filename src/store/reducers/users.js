

import * as actionTypes from "../actionTypes"
const intialState ={
	isAuthenticated: false,
	collection:[],
	user:null,
	loading:false,
	error:null
}

 const userReducer = (state = intialState, action) =>{
    switch (action.type) {
			case actionTypes.SET_USER:
				return{
					...state,
					user:action.payload,
					isAuthenticated:true,
				}
			// case actionTypes.LOG_USER:
			// case actionTypes.SIGN_USER:
			// 	return{
			// 		...state,
			// 		...action.payload,
			// 		isAuthenticated:true
			// 	}
			case actionTypes.LOG_OUT_USER:
			// case actionTypes.SIGN_USER_FAIL:
			// case actionTypes.LOG_USER_FAIL:
				return{
					...state,
					isAuthenticated:false,
					user:null,
					error:action.payload,
					loading:false,
					collection:[]
				}

			case actionTypes.SET_COLLECTION:
				return{
					...state,
					collection: action.payload
				}
			case actionTypes.ADD_BOOK:
				return{
					...state,
					user:{...state.user, books:[...state.user.books, action.payload]},
					collection: [action.payload,...state.collection]
				}
			case actionTypes.REMOVE_BOOK:
				return{
					...state,
					user:{...state.user, 
								books: state.user.books.filter(book => book._id !== action.payload._id ? book : null)}
				}
			case actionTypes.GET_COLLECTION:
				return{
					...state,
					loading: true,
					error:null
				}
			case actionTypes.COLLECTION_ERROR:
				return{
					...state,
					loading:false,
					error: action.payload
				}
			default:
				return state
		}
};

export default userReducer;