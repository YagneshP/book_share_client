
import * as actionTypes from "../actionTypes";
const intialState = {
	library:null,
	error: null,
	loading:false
}
const searchReducer = (state=intialState, action) =>{
	switch (action.type) {
		case actionTypes.GET_BOOKS:
			return{
				...state,
				loading:true
			}
		case actionTypes.SET_BOOKS:
			return{
				...state,
			loading:false,
      library:[...action.payload]
			}
		case actionTypes.LIB_ERROR:
			return{
				...state,
				loading:false,
				error: action.payload
			}
		case actionTypes.CLEAR_LIB_RESULT:
			return{
				...state,
				loading:false,
				library:null
			}
		default:
		return state
	}
}

export default searchReducer;