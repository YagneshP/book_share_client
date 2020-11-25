import * as actionTypes from "../actionTypes";

const setCollection =(data) =>{
	return{
	type: actionTypes.SET_COLLECTION,
	payload: data.books
}}

//getting collection of books 
export const getCollection = (filteredId) =>{
	return dispatch => {
		fetch(`/users/${filteredId}`)	
		.then(res => {
			const data = res.json();
			return data
		})
		.then(data => dispatch(setCollection(data)));
	}
}
		
//postBook to collection
export const postCollection = (filteredId) =>{
	return dispatch => {
		fetch(`/users/${filteredId}/books`)
		.then(res => {
			console.log(res)
			const data = res.json()
		}).then(data => {
			console.log(data);
		});
	}
}
	

	
 
