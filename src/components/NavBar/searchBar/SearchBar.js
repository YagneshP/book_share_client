import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import * as actions from "../../../store/actions/seachAction"
import {connect} from "react-redux";

import * as Yup from "yup";
import {TextField} from "@material-ui/core";
import {Formik,Form, Field, useField} from "formik";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
		width: "500px",
		margin:"10px 20px"
	},
	searchForm:{
			flexDirection: "row",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			padding:10
	},
  input: {
    // marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
		padding: 5,
		marginLeft:5,
		backgroundColor:"#1d751dd6",
		borderRadius:"10%"
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const initialValues = {
query:""
}

const validationSchema = Yup.object().shape({
	query: Yup.string()
		.required('Query is Required')
});

const CustomField = ({label,placeholder,type, required, ...props})=>{
	const[field,form]= useField(props);
	const errorText = form.error && form.touched ? form.error : "";
	return <TextField type={type} required={required}label={label} {...field} helperText={errorText} error={!!errorText} placeholder={placeholder} />
}
const SearchBar=(props)=> {

// const query =	createRef("")
// 	const [ query, setQuery] = useState("")
	const classes = useStyles();
	// const handleSubmit= (e) =>{
	// 	e.preventDefault();
	// 	props.searchData(query);
	// }

  return (
		<div className={classes.searchForm}>
			{/* <Paper className={classes.root}> */}
					<Formik
					    enableReinitialize={true}
							initialValues={initialValues }
							onSubmit={(values)=>{ 
								props.searchData(values);
							}}
							validationSchema={validationSchema }
					>
						{(props)=> (
							<>
								<Form>
								
									 <Field id="query" name="query" as={CustomField} placeholder="SearchBooks"    required></Field>
									 
									 <IconButton type="submit" className={classes.iconButton} aria-label="search" >
        						<SearchIcon />
      						</IconButton>
									
								</Form>		 
									</> )}
    {/* <Paper component="form" className={classes.root} onSubmit={handleSubmit}> */}

			{/* <input  name="query" value={query} onChange={(e)=>setQuery(e.target,value/> */}
      {/* <InputBase
				className={classes.input}
				name="query"
				ref={query}
				value={query}
				onChange={(e)=>setQuery(e.target.value)}
        placeholder="Search Books...."
        inputProps={{ 'aria-label': 'search book' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" >
        <SearchIcon />
      </IconButton>
    </Paper> */}
		
		</Formik>
		{/* </Paper> */}
		</div>
	
  );
}
const mapDispatchToProps = dispatch =>( {
		searchData: (q) => dispatch(actions.getSearchData(q))
})

export default connect(null,mapDispatchToProps )(SearchBar)