import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Switch, Route , Link} from 'react-router-dom'

import FormAdd from './component/Item/FormAdd';
const title = {
  flexGrow: 1
}

class Uinav extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  
  }

  render() {
    

    return (
      <Router>
      <div >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={title}>
            Stock Managment App
          </Typography>
    
          
          <a href='http://localhost:3000/Add'>
          <Button color="inherit" >Add-Item</Button>
          </a>
          
        
        
    
          
        </Toolbar>
      </AppBar>
    </div>
      
      
      
      
      
      
      
      
      
      </Router>
    
    );
  }
}
export default Uinav