import { CircularProgress } from '@material-ui/core';
import React from 'react'
import BookTemplet from '../BookTemplet/BookTemplet';

const BookCollection = (props) => {
	let{collection, user}= props
let bookCollection = <CircularProgress/>;	
return (<div>
{collection === null ? bookCollection : collection.length === 0 ? <h1>You dont have any book in your library</h1> :  collection.map(collection => <BookTemplet key={collection.title} user={user} book={collection} />  )} 
</div>)
}


export default BookCollection;
