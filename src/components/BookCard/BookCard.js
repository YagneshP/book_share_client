import React, { useEffect, useState } from 'react';

import {  CircularProgress} from '@material-ui/core';
import BookTemplet from "../BookTemplet/BookTemplet"





export default function BookCard() {
	const[books, setBooks] = useState(null);
	useEffect(()=>{
		(async()=>{
		const booksFromApi = await getData();
		setBooks(booksFromApi);
		})();
	
	},
	[]);

	//getting data from backend
	const getData =  async ()=>{
		const res = await fetch("/data");
		const data = res.json();
		return data
	};
	
 
let bookList = "Loading...";
	{books === null ? bookList = <CircularProgress/> : bookList = books.map(book => <BookTemplet key={book.title} book={book}/>)}
  return (
   bookList
  );
}
