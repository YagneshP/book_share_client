import React from 'react';
import {TextField, Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"
import {useFormik } from "formik";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MenuBookIcon from '@material-ui/icons/MenuBook';
const useStyles = makeStyles((theme)=>({
	formDiv:{
		height:"100%",
		marginTop:"10vh"
	},
	formBox:{
		margin: "10px auto",
    // border: "1px solid black",
    padding: "10px 10px",
    borderRadius: "10px",
    backgroundColor: "#d4d8efc7",
    boxShadow: " 5px 6px 10px rgba(112,115,115,0.2),-5px 6px 10px rgba(112,115,115,0.2),-5px -6px 10px rgba(112,115,115,0.2) ",
	},
	 root: {
	width:"80vw",
    '& > *': {
			marginBottom: theme.spacing(1),
			width:"80vw"
    },
}
}))
const SignUpForm = () => {

	const formik = useFormik({
		initialValues:{
			firstName:"",
			lastName:"",
			email:"",
			password:""
		},
		onSubmit : values => {
			console.log("[Values]", values);
		}
	});
	const classes = useStyles();
	return (
		// <div className={classes.root}>
		<Grid container className={classes.formDiv}>
		
			<div className={classes.formBox}>
				<Grid style={{textAlign:"center"}}>
						<MenuBookIcon fontSize="large" style={{color:"#3d41d0d4"}}/>
				</Grid>
				<Grid item xs={12}  >
				<form onSubmit={formik.handleSubmit} className={classes.root} >
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="FirstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
				 <TextField
           fullWidth
          id="lastName"
          name="lastName"
          label="LastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
				 <TextField
        fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
				<pre>
				{JSON.stringify(formik.values, null, 2)}
			</pre>
      </form>
				</Grid>
		
		
		</div>
	
		</Grid>
	
	)
}

export default SignUpForm
