import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import * as actions from "../../../store/actions/seachAction"
import {connect} from "react-redux"
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
		width: "500px",
		margin:"10px 20px"
	},
	searchForm:{
			flexDirection: "column",
			display: "flex",
			alignItems: "center"
	},
  input: {
    // marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
		padding: 10,
		backgroundColor:"#1d751dd6",
		borderRadius:"10%"
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchBar=(props)=> {
	const [ query, setQuery] = useState("")
	const classes = useStyles();
	const handleSubmit= (e) =>{
		e.preventDefault();
		console.log(query)
		props.searchData(query);
	}

  return (
		<div className={classes.searchForm}>

	
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>

			{/* <input  name="query" value={query} onChange={(e)=>setQuery(e.target,value/> */}
      <InputBase
				className={classes.input}
				name="query"
				value={query}
				onChange={(e)=>setQuery(e.target.value)}
        placeholder="Search Books...."
        inputProps={{ 'aria-label': 'search book' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" >
        <SearchIcon />
      </IconButton>
    </Paper>
		</div>
  );
}
const mapDispatchToProps = dispatch =>( {
		searchData: (q) => dispatch(actions.getSearchData(q))
})

export default connect(null,mapDispatchToProps )(SearchBar)