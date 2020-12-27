import React, { useEffect} from 'react';
import {TextField, Button, Grid,Typography, Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"
import {Formik,Form, Field, useField} from "formik";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import * as Yup from "yup";
import {signUpUser, logUser} from "../../store/actions/userAction";
import {connect} from "react-redux"
import { toggleForm } from '../../store/actions/toggleFormAction';
const useStyles = makeStyles((theme)=>({
	formDiv:{
		height:"100%",
		marginTop:"10vh"
	},
	formBox:{
		margin: "10px auto",
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
}));


const initialValues = {
	firstName:"",
	lastName:"",
	city:"",
	email:"",
	password:""
}
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email')
		.required('Required'),
	password: Yup.string()
		.min(8,"Password must be min 8 or max 30 characters long")
		.max(30,"Password must be min 8 or max 30 characters long ")
		.required("Password is required")
});

const CustomField = ({label,placeholder,type, required, ...props})=>{
	const[field,form]= useField(props);
	const errorText = form.error && form.touched ? form.error : "";
	return <TextField type={type} required={required}label={label} {...field} helperText={errorText} error={!!errorText} placeholder={placeholder} />
}
const LogInForm = (props) => {
	const{isAuthenticated, loggedIn,toggleForm} = props
	useEffect(
		() => {
			if (isAuthenticated) {
				props.history.push('/library');
			}
		},
		[isAuthenticated, props.history]
	);
	const classes = useStyles();
	return (
		<Grid container className={classes.formDiv}>
		
			<div className={classes.formBox}>
				<Grid style={{textAlign:"center"}}>
					<MenuBookIcon fontSize="large" style={{color:"#3d41d0d4", display:"inline-block", verticalAlign: "bottom"}}/>
					<Typography variant="h6" style={{display:"inline-block", marginLeft:"15px", color:"#3d41d0d4"}}>{loggedIn? "LogIn" : "SignUp"} Form</Typography>
				</Grid>
				<Grid item xs={12}  >
					<Formik
					    enableReinitialize={true}
							initialValues={initialValues }
							onSubmit={(values)=>{ loggedIn ?
								props.logIn({email:values.email,password:values.password}):props.signUp(values);
							}}
							validationSchema={loggedIn ? 
																	validationSchema : 
																	validationSchema.shape({	firstName: Yup.string()
																		.min(2, 'Too Short!')
																		.max(70, 'Too Long!')
																		.required('Required'),
																	lastName:Yup.string()
																		.min(2, 'Too Short!')
																		.max(70, 'Too Long!'),
																	city:Yup.string()
																		.required('City Name is required!')})}
					>
						{(props)=> (
								<Form className={classes.root} >
									{loggedIn? null:
									<>
									 <Field id="firstName" name="firstName" as={CustomField}label = "FirstName"required></Field>
									 <Field id="lastName" name="lastName" 	as={CustomField}	label = "LastName"></Field>
									 <Field id="city" name="city" 	as={CustomField}	label = "City" required></Field>
									</>}
									<Field id="email" name="email" as={CustomField}label = "Email" required></Field>
									<Field id="password"	name="password"	label="Password"	type="password" as={CustomField} required	/>
									<Button color="primary" variant="contained" fullWidth type="submit">
											{loggedIn ? "Log In" : "Sign Up" }
									</Button>
								
								</Form>
						)}
					</Formik>
				</Grid>
		
		<Grid item>
			<Typography variant="body2" style={{textAlign:"center"}}>Already have an account ? <Link onClick={toggleForm}>{loggedIn ? "SignUp": "LogIn" }</Link> here</Typography>
		</Grid>
		</div>
	
		</Grid>
	
	)
}
const mapStateToProps = state =>({
	isAuthenticated: state.user.isAuthenticated,
	loggedIn: state.form.logInForm
})
const mapDispatchToProps = dispatch =>({
	signUp : (values)=>{dispatch(signUpUser(values))},
	logIn:(values)=>{dispatch(logUser(values))},
	toggleForm : () => {dispatch(toggleForm())}
})
export default connect(mapStateToProps,mapDispatchToProps)(LogInForm);
