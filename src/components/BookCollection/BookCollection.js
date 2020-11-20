import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import BookTemplet from '../BookTemplet/BookTemplet';

const BookCollection = () => {
	const[collection, setCollection]=useState(null);
	useEffect(()=>{
		(async()=>{
			 await getCollection().then(user =>{
				setCollection(user.books);
			 });
			// console.log(book);
			// setCollection(book);
		
		})()
	},[]);
	const getCollection = async ()=>{
		const filteredId = 1;
		 const res = await fetch(`/users/${filteredId}`)
			const data = res.json();
		
			return data;
		 }
	
	let bookCollection = <CircularProgress/>;
	
return (<div>
{collection === null ? bookCollection : collection.length === 0 ? <h1>You dont have any book in your library</h1> :  collection.map(collection => <BookTemplet key={collection.title} user={true} book={collection} />  )} 
</div>)
}


export default BookCollection;
