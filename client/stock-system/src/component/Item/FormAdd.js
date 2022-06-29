import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { addUsers } from '../../redux';
import { connect } from 'react-redux'
import App from '../../App.css'
const formdesign = {
  marginLeft: 150,
  marginTop: 100,
}
// const itemDesign = {

//   marginTop: 40,
//   marginLeft: 70,
// }
// const labelDesign = {
//   marginTop: 70
//   , marginLeft: 40,

// }

const textarea = {
  width: 600,
  height: 500,

  padding: 30,
  border: '1px solid red',
  borderColor: 'black',
  borderWidth: 2,

}
// const col25={
//   display:'flex',
//   flexDirection:'flex-start',
//   padding: '12px 12px 12px 0',
//   display: 'inline-block',
//   marginTop:6,
//   width:'25%'
// }
// const col75={


//   float:'right',
//   width:'75%',
//   marginTop:6,

// }
// const curlabel = {
//   marginLeft: 40,
//   marginTop: 100
// }
// const curText = {
//   marginTop: 3,
//   float:'right'


// }
// const manuLabel={

//   marginLeft:30,
//   marginTop:100
// }

class FormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      currentStock: '',
      manufacturingCompany: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack=this.handleBack.bind(this);
  }
  handleBack(){
    this.props.history.goBack('/')
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }
  handleSubmit() {
    this.props.addUsers(this.state.itemName, this.state.manufacturingCompany, this.state.currentStock)
    this.props.history.push('/')
  }
  render() {

    return (
      <div style={formdesign}>


        <form noValidate autoComplete="off" className="cardDesign" >


          <h3> ItemName:  </h3>
          <TextField id="outlined-full-width" fullWidth={true} style={{ marginRight: 8 }} name="itemName" variant="outlined" label="ITEMNAME" value={this.state.itemName} onChange={this.handleChange} />





          <h3>  CurrentStock:     </h3>

          <TextField
            id="standard-number"
            id="outlined-full-width" fullWidth={true}
            name="currentStock"
            label="CurrentStock"
            type="number"

            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.currentStock} onChange={this.handleChange} />


          <h3>   ManufacturingCompany:  </h3>
          <TextField id="outlined-full-width" style={{ marginRight: 8 }} fullWidth={true}
            variant="outlined" label="ManufacturingCompany" value={this.state.manufacturingCompany} name="manufacturingCompany" onChange={this.handleChange} />


          <div className="buttonDesign">    <Button style={{ backgroundColor: "#6cc7e6", margin: 12 }} onClick={this.handleSubmit}>
            Submit
          </Button>

          </div>
          <div className="buttonDesign">    <Button style={{ backgroundColor: "#6cc7e6", margin: 12 }} onClick={this.handleBack}>
          Back
        </Button>

        </div>

        </form>





      </div>
    )
  }
}


const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUsers: (itemName, manufacturingCompany, currentStock) => dispatch(addUsers(itemName, manufacturingCompany, currentStock))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAdd)


