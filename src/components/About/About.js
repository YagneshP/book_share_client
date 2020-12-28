import { Container, List,ListItem,ListItemText,ListItemAvatar,Avatar} from '@material-ui/core'
import React from 'react'

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import SearchIcon from '@material-ui/icons/Search';
import ImportExportIcon from '@material-ui/icons/ImportExport';



const About = () => {

	return (
		<Container maxWidth="sm">
			<List >
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{backgroundColor:"#173a75bd"}}>
            <LibraryBooksIcon style={{color:"#d5e1fd"}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="You can find and make your collection of books"  />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{backgroundColor:"#f38a11b3"}}>
            <SearchIcon style={{color:"#343f88b0"}} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Seach who else have the book , which you are keen to read"  />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{backgroundColor:"#805f5fdb"}}>
            <ImportExportIcon style={{color:"#fafafa"}}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Rent the books or get rental book"  />
      </ListItem>
    </List>
			
		</Container>
	)
}

export default About
