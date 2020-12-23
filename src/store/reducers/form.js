import * as actionTypes from "../actionTypes";
const intialState = {
	logInForm : true
}
const formReducer = (state = intialState,action) => {
	switch(action.type){
		case(actionTypes.TOGGLE_FORM):
			return {
				logInForm : !state.logInForm
			}
			case(actionTypes.CHANGE_LOGIN_FORM):
			return{
				logInForm: true
			}
			case(actionTypes.CHANGE_SIGNUP_FORM):
			return{
				logInForm: false
			}
default:
	return state
	}
}

export default formReducer