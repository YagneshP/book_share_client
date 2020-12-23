import React, { useEffect } from 'react'
import {  Button, Divider, Grid, Typography,Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import {addCollection, removeCollection} from "../../store/actions/userAction"
// import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	text:{
		...theme.typography.h4,
		color:"#63a2e2"
	},
	title:{
		...theme.typography.h5,
		color:"#3f51b5"
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

// const{addBook} = props
	const {book,user, addBook,isCollection,removeBook} = props;
let volumeInfo;
	if(isCollection){
	   volumeInfo = book
	} else{
		volumeInfo= book.volumeInfo
	}
	const  truncate = function(str, n){
		return (str.length > n) ? str.substr(0, n-1) + '...' : str; 
		// &hellip;'
	};
	function titleCase(str) {
		var splitStr = str.toLowerCase().split(' ');
		for (var i = 0; i < splitStr.length; i++) {
				// Assign it back to the array
				splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
		}
		// Directly return the joined string
		return splitStr.join(' '); 
 }
	

	// const handleClick = () =>{
	// user.books.map(book => book.industryIdentifiers[0].identifier !== item.industryIdentifiers[0].identifier ? console.log("book.Indentifier",book.industryIdentifiers[0].identifier):console.log("item.Indentifier",item.industryIdentifiers[0].identifier)  );
	// console.log(user.books);
  // const updatedUser = {
	//     ...user,
	//      books: user.books.map(book =>(book.industryIdentifiers[0].identifier === item.industryIdentifiers[0].identifier) ? alert("You have already this book in your collection"):	[...user.books,item])
	//     }
// 	addBook(user._id,book.id);
// }
	const classes = useStyles();
	// const{imageLinks,title,subtitle,authors}
	return (
		<div className={classes.root}>
		<Grid container  style={{margin:"10px 0"}}  >
			<Grid item xs={12} sm={3} md={3} lg={3}  style={{textAlign:"center",alignSelf:"center",padding:10}}>
				<img src={volumeInfo.imageLinks?`${volumeInfo.imageLinks.thumbnail}`:null} alt={volumeInfo.title?`${volumeInfo.title}:${volumeInfo.subtitle}`:null}/>
			</Grid>
			<Grid item xs={12} sm={6}md={6} lg={6} style={{alignSelf:"center", padding:10}}  >
				<Typography className={classes.title} >
					<Link href={volumeInfo.previewLink} target="_blank">{ titleCase( volumeInfo.title)} </Link> 
				</Typography>
				<Typography variant="body1" component="p" className={classes.subtext}>{volumeInfo.subtitle}</Typography> 
				<Typography variant="body2" component="p" className={classes.subtext} >
				by 	<Typography variant="body2" component="span" className={classes.authors} >{volumeInfo.authors?volumeInfo.authors.join(" , "):null}</Typography> 
				</Typography>
				<Typography variant="body1" component="p" className={classes.subtext}>Publisher, Date : <Typography variant="body2" component="span" className={classes.authors} >{volumeInfo.publisher?volumeInfo.publisher:null} , {volumeInfo.publishedDate?volumeInfo.publishedDate:null}</Typography></Typography>
	{!isCollection?<Typography variant="body1" component="p" className={classes.subtext}>Description : <Typography variant="body2" component="span" >{volumeInfo.description? truncate(volumeInfo.description,100):null}</Typography></Typography>:null }
			</Grid>
			<Grid item xs={12} sm={3} md={3} lg={3}container justify='space-evenly' alignItems="center">
				{!isCollection ?	<Button  variant="outlined" color="primary" onClick={()=> addBook(user._id, book.id)}>Add To List</Button>:	<Button  variant="outlined" color="primary" onClick={()=> removeBook(user._id, volumeInfo._id)}>Remove</Button>}
			
					<Button variant="outlined"  color="secondary" component={"a"} href={volumeInfo.previewLink} target="_blank">Preview</Button> 
			</Grid>
		</Grid>
		<Divider/>
	</div>
	)
}
const mapStateToProps = state => ({
	user : state.user.user
})

const mapDispatchToProps = dispatch =>({

		addBook : (userId,volumeId)=>dispatch (addCollection(userId,volumeId)),
		removeBook:(userId,book_Id)=> dispatch(removeCollection(userId,book_Id))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookTemplet);
