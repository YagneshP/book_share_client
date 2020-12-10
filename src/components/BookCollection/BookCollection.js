import { CircularProgress } from '@material-ui/core';
import React from 'react'
import BookTemplet from '../BookTemplet/BookTemplet';
import {connect} from "react-redux"

const BookCollection = (props) => {
	let{collection}= props
	console.log("collection", collection)
let bookCollection = <CircularProgress/>;	
return (<div>
{collection === null ? bookCollection : collection.length === 0 ? <h1>You dont have any book in your library</h1> :  collection.map(collection => <BookTemplet key={collection.id} isCollection={true} book={collection} />  )} 
</div>)
}

const mapStateToProps = state => ({
	collection: state.user.user.books
})

export default connect(mapStateToProps)(BookCollection);
