import React,{useState} from 'react'
import {Button, FormControl,Input
,InputLabel,MenuItem,Select,Grid,Paper, Card, CardContent, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { findRental } from '../../store/actions/userAction'
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
	},
searchButton:{
backgroundColor:"#11a215",
color:"#eff4f7"
}

}))
const RentalSearch = (props) => {
	const classes = useStyles();
	const {findUserRental,userId,rentalUsers} = props
const[radius,setRadius] = useState(5);
const[bookName, setBookName]= useState("")
	const handleRadiusChange = (e) => {
			setRadius(e.target.value)
	}
	const handleBookNameChange = (e) =>{
		setBookName(e.target.value)
	}
	const handleSumbit = (e) =>{
		e.preventDefault();
		console.log("bookName:", bookName)
		findUserRental(userId,radius,bookName)
	}
	return (
		<div>
			<Paper component="form" onSubmit={handleSumbit} style={{margin:"0 auto", width:400, display:"flex", justifyContent:"space-between"}}>
      <FormControl style={{margin:10}}>
        <InputLabel htmlFor="component-book">BookName</InputLabel>
        <Input id="component-book" name="bookName" value={bookName} onChange={handleBookNameChange}  />
      </FormControl>
	
			<FormControl style={{margin:10}}>
        <InputLabel id="demo-simple-select-label">Radius</InputLabel>
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
			<Button type="submit" className={classes.searchButton}><SearchIcon/></Button>
		
			</Paper>
		{rentalUsers?(	
		<Grid container style={{marginTop:25}} spacing={2} justify="space-around">
			{rentalUsers.map((rentalUser) => (
            <Grid key={rentalUser.email} item>
              <Card style={{backgroundColor:"rgb(76 57 185 / 42%)"}}>
								<CardContent>
									<Typography>
									<strong>	Name:</strong> {rentalUser.firstName}
									</Typography>
									<Typography>
									<strong> Email:</strong>	 {rentalUser.email}
									</Typography>
								</CardContent>
								</Card>
            </Grid>
          ))}
        </Grid>
     ):null}
		</div>
	)
}

const mapStateToProps = state => ({
 userId : state.user.user._id,
 rentalUsers: state.rentalUsers.rentalUser
})
const mapDispatchToProps =  dispatch => ({
   findUserRental : (userId,radius,bookName) => dispatch(findRental(userId,radius,bookName))
})
export default connect(mapStateToProps, mapDispatchToProps)(RentalSearch);
