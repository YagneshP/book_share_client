import React,{useState} from 'react'
import {Button, FormControl,Input
	,InputLabel,MenuItem,Select,Grid,Paper,FormHelperText} from '@material-ui/core'
	import { makeStyles } from '@material-ui/core/styles';
	import { connect } from 'react-redux'
	import { clearRentalUser, findRental } from '../../../store/actions/rentalUsersActions'
	import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: '2px 4px',
    display: 'flex',
		alignItems: 'center',
		maxWidth:800,

	},
searchButton:{
backgroundColor:"#11a215",
color:"#eff4f7",
height:"100%",
width:"100%",
"&:hover":{
	backgroundColor:"#caad02"
}
}

}))
const RentalForm = (props) => {
	const classes = useStyles();
	const {findUserRental,userId} = props
	const[radius,setRadius] = useState(5);
	const[error, setError]=useState(false)
	const[bookName, setBookName]= useState("")
	const handleRadiusChange = (e) => {
			setRadius(e.target.value)
	}
	const handleBookNameChange = (e) =>{
		setBookName(e.target.value)
		setError(false)
	}
	const handleBlur = () =>{
		if(bookName === ""){
			setError(true)
		}
	}

	const handleSumbit = (e) =>{
		e.preventDefault();
		console.log("bookName:", bookName)
		findUserRental(userId,radius,bookName)
	}
	return (
		<div>
				<Grid container justify="center" >
				<Grid item xs={9} sm={9} md={9} lg={6} xl={4}>
				<Paper component="form" onSubmit={handleSumbit} className={classes.root} >
					<Grid container item justify="space-evenly">
						<Grid xs={12} sm={5}  md={7} lg={6} item style={{margin:5}} >
							<FormControl fullWidth >
	        			<InputLabel htmlFor="component-book">BookName</InputLabel>
	        			<Input id="component-book" name="bookName" value={bookName} onChange={handleBookNameChange} onBlur={handleBlur} required />
								{error? <FormHelperText error>BookName is required</FormHelperText>:null}
	      			</FormControl>
						</Grid>
						<Grid  xs={12} sm={2} md={2} lg={3} item style={{margin:5}}>
						<FormControl fullWidth >
        			<InputLabel id="demo-simple-select-label">Within</InputLabel>
				        <Select
				          labelId="demo-simple-select-label"
				          id="demo-simple-select"
				          value={radius}
									onChange={handleRadiusChange}
									renderValue={(value) => `${value} km`}
				        >
				          <MenuItem value={5}>5</MenuItem>
				          <MenuItem value={10}>10</MenuItem>
				          <MenuItem value={20}>20</MenuItem>
									<MenuItem value={40}>40</MenuItem>
									<MenuItem value={60}>60</MenuItem>
									<MenuItem value={80}>80</MenuItem>
									<MenuItem value={100}>100</MenuItem>
				        </Select>
      				</FormControl>
						</Grid>
						<Grid xs={12} sm={1} md={1} lg={1} item style={{margin:5}}>
						 <Button type="submit" className={classes.searchButton}><SearchIcon/></Button>
						</Grid>
				</Grid>
		  	</Paper>
				</Grid>
			
			</Grid>
		</div>
	)
}
const mapStateToProps = state => ({
	userId : state.user.user._id,
	rentalUsers: state.rentalUsers.rentalUser
 })
 const mapDispatchToProps =  dispatch => ({
		findUserRental : (userId,radius,bookName) => dispatch(findRental(userId,radius,bookName)),
		clearResult : ()=> dispatch(clearRentalUser(dispatch))
 })
export default connect(mapStateToProps, mapDispatchToProps)(RentalForm);
