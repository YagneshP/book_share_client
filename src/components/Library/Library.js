import React from 'react'
import {connect} from "react-redux"
import { CircularProgress } from '@material-ui/core';
import BookTemplet from "../BookTemplet/BookTemplet";
import SearchBar from "../NavBar/searchBar/SearchBar"
import PrivateRoute from '../PrivateRoute/PrivateRoute';
const Library = (props) => {
	const{library,loading} = props
	// let bookitems;
	return (
		<>
		<SearchBar/>
		<div>
			{loading ? <CircularProgress/>: library === null ? null : library.length === 0 ? <h1>Can not find book</h1> :  library.map(bookItem => <BookTemplet key={bookItem.id}  book={bookItem} />  )} 
		</div>
		</>
	)
}
const mapStateToProps = state => ({
	library: state.library.library,
	loading: state.library.loading
})

export default connect(mapStateToProps)(Library);
