
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
