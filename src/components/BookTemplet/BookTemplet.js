import React, { useEffect } from 'react'
import {  Button, Divider, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import {postCollection} from "../../store/actions/userAction"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	text:{
		...theme.typography.h4,
		color:"#63a2e2"
	},
	subtext:{
		...theme.typography.body1,
		color:"grey",
	},
authors:{
		...theme.typography.body1,
		color:"#63a2e2",
	},
}));
const BookTemplet = (props) => {

const{addBook} = props
	const {book, user, isLoggedIn} = props;

	const  truncate = function(str, n){
		return (str.length > n) ? str.substr(0, n-1) + '...' : str; 
		// &hellip;'
	};
// 	const handleClick = (item) =>{
// 	user.books.map(book => book.industryIdentifiers[0].identifier !== item.industryIdentifiers[0].identifier ? console.log("book.Indentifier",book.industryIdentifiers[0].identifier):console.log("item.Indentifier",item.industryIdentifiers[0].identifier)  );
// 	console.log(user.books);
//   const updatedUser = {
// 	    ...user,
// 	     books: user.books.map(book =>(book.industryIdentifiers[0].identifier === item.industryIdentifiers[0].identifier) ? alert("You have already this book in your collection"):	[...user.books,item])
// 	    }
// }
	const classes = useStyles();
	return (
		<div className={classes.root}>
		<Grid container  style={{margin:"10px 0"}} spacing={2} >
			<Grid item xs={3} xl={2} style={{textAlign:"center"}}>
				<img src={`${book.imageLinks.thumbnail}`} alt={`${book.title}:${book.subtitle}`}/>
			</Grid>
			<Grid item xs={6} xl={9}style={{alignSelf:"center"}} >
				<Typography variant="h5" className={classes.text} component="a">
				 {book.title} 
				</Typography>
				<Typography variant="body1" component="p" className={classes.subtext}>{book.subtitle}</Typography> 
				<Typography variant="body2" component="p" className={classes.subtext} >
				by 	<Typography variant="body2" component="span" className={classes.authors} >{book.authors.join(" , ")}</Typography> 
				</Typography>
				<Typography variant="body1" component="p" className={classes.subtext}>Publisher, Date : <Typography variant="body2" component="span" className={classes.authors} >{book.publisher} , {book.publishedDate}</Typography></Typography>
				<Typography variant="body1" component="p" className={classes.subtext}>Description : <Typography variant="body2" component="span" >{truncate(book.description,100)}</Typography></Typography>
			</Grid>
			<Grid item xs={3} xl={1} container alignContent="space-around">
					 <Button  variant="outlined" color="primary" onClick={()=>addBook(1)}>Add To List</Button>
					<Button variant="outlined" color="secondary">View Detail</Button>
			</Grid>
		</Grid>
		<Divider/>
	</div>
	)
}
const mapDispatchToProps = dispatch =>{
	return {
		addBook : dispatch((id)=> postCollection(1))
	}
}

export default  connect(null, mapDispatchToProps)(BookTemplet)   
