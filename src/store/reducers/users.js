import * as actionTypes from "../actionTypes"
const intialState ={
	isAuthenticated: true,
	collections: null
}

 const userReducer = (state = intialState, action) =>{
    switch (action.type) {
			case actionTypes.SET_COLLECTION:
				return{
					...state,
					collections: action.payload
				}
		
			default:
				return state
		}
};

export default userReducer;