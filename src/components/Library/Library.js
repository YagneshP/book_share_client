import React,{useState} from 'react'
import {connect} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import BookTemplet from "../BookTemplet/BookTemplet";
import SearchBar from "../NavBar/searchBar/SearchBar";
import Pagination from '@material-ui/lab/Pagination';
import { clearResult } from '../../store/actions/seachAction';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
    },
	},
	ul: {
		
    display: 'flex',
   
    flexWrap: 'wrap',
    listStyle: 'none',
		alignItems: 'center',
		justifyContent:"center"
	}
}));
const Library = (props) => {
const[currentPage, setCurrentPage] = useState(1)
	const{library,loading,clearLibResult} = props;


	const bookPerPage = 3;
	// const currentPage = 1;
	const totalBooks = library !== null? library.length : 0
	const totalPages = Math.ceil( totalBooks/bookPerPage);
	const indexOfLastBook = currentPage * bookPerPage;
  const indexOfFirstBook= indexOfLastBook - bookPerPage;
	const currentBooks = library !== null ? library.slice(indexOfFirstBook, indexOfLastBook) : 0;
	const handleChange = (event, value) => {
    setCurrentPage(value);
	};
	const handleClick = () =>{
			clearLibResult()
	}
	const classes = useStyles();
	// let bookitems;
	return (
		<>
		<SearchBar/>
		{library === null ? null :library.lenght !== 0 ?<div style={{ textAlign:"center", marginTop:"15px", marginBottom:"25px"}} ><Button variant="contained" color="primary" onClick={handleClick}>Clear Result</Button></div> : null}
		
		<div>
			{loading ? <div style={{textAlign:"center"}}><CircularProgress /></div>: library === null ? null : library.length === 0 ? <h1>Can not find book</h1> :  currentBooks.map(bookItem => <BookTemplet key={bookItem.id} isCollection={false} book={bookItem} />  )} 
		</div>
		<div className={classes.root}>
		{library !== null ?<Pagination count={totalPages} page={currentPage} onChange={handleChange} className={classes.ul} color="primary"/>: null}
		</div>
		{/* <PageNumber/> */}
		</>
	)
}
const mapStateToProps = state => ({
	library: state.library.library,
	loading: state.library.loading
});
const mapDispatchToProps = dispatch => ({
	clearLibResult : ()=>{dispatch(clearResult())}
})

export default connect(mapStateToProps,mapDispatchToProps)(Library);
