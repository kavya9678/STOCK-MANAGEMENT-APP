import React, { Component } from 'react'
import App from '../../App.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { editUsers } from '../../redux';
const formdesign = {
  marginLeft: 150,
  marginTop: 100,
}

class EditForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itemName: '',
      manufacturingCompany: '',
      currentStock: ''
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleBack=this.handleBack.bind(this);
  }
  handleBack(){
    this.props.history.goBack('/')
  }
  handleAdd() {

    const itemObject = {
      _id: this.props.match.params.id,
      itemName: this.state.itemName,
      manufacturingCompany: this.state.manufacturingCompany,
      currentStock: this.state.currentStock
    }

    this.props.editUsers(itemObject)
    this.props.history.push('/')
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  componentDidMount() {
    const { individualItemDetail } = this.props
    console.log('details', individualItemDetail)
    this.setState({

      itemName: individualItemDetail.itemName,
      currentStock: individualItemDetail.currentStock,
      manufacturingCompany: individualItemDetail.manufacturingCompany
    })
  }


  render() {

    return (
      <div style={formdesign}>
        <form className="formDesign" noValidate autoComplete="off">
          <h3> ItemName:  </h3>
          <TextField id="outlined-full-width" onChange={this.handleChange} fullWidth={true} value={this.state.itemName} style={{ marginRight: 8 }} name="itemName" variant="outlined" label="ITEMNAME" />

          <h3>  CurrentStock:     </h3>
          <TextField
            value={this.state.currentStock}
            onChange={this.handleChange}
            id="standard-number"
            id="outlined-full-width" fullWidth={true}
            name="currentStock"
            label="CurrentStock"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <h3>   ManufacturingCompany:  </h3>
          <TextField id="outlined-full-width" style={{ marginRight: 8 }} value={this.state.manufacturingCompany} fullWidth={true}
            variant="outlined" label="ManufacturingCompany" name="manufacturingCompany" onChange={this.handleChange} />



          <div className="buttonDesign">    <Button style={{ backgroundColor: "#6cc7e6", margin: 12 }} onClick={this.handleAdd}>
            UPDATE
          </Button>
          

          </div>
          <div className="buttonDesign">    <Button style={{ backgroundColor: "#6cc7e6", margin: 12 }} onClick={this.handleBack}>
          BACK
        </Button>
        

        </div>




        </form>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    individualItemDetail: state.individualItemDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editUsers: (id) => dispatch(editUsers(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)