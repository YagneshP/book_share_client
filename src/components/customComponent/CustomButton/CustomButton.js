// import { Button } from '@material-ui/core'
// import React from 'react'

// const CustomButton = () => {
// 	return (
// 	<Button>
// 	)
// }

// export default CustomButton

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const CustomButton = withStyles({
  root: {
		border: 0,
    height: 48,
		backgroundColor:'#041C29' ,
		color:'#ffffff',
		fontSize:'20px',
		padding: '24px',
		borderRadius: '10px',
		fontWeight: 'bold',
		"&:hover":{
			backgroundColor:"#7a1886"
		}
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default CustomButton;
