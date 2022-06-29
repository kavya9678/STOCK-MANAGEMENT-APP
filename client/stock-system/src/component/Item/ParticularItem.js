import React, { Component } from 'react'
import { viewParticularUsers } from '../../redux'
import { Card } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
const formdesign = {
  marginLeft: 150,
  marginTop: 100,
}
const newDesign = {
  backgroundColor: 'lightgrey',
  width: '600px',
  border: '15px solid green',
  padding: '50px',
  margin: '20px',
  maxWidth: '75%',
  height: 300,
  maxHeight: '85%',
  marginLeft: '30%',
  marginTop: '10%'

}
class ParticularItem extends Component {
  constructor(props) {
    super(props);


    this.handleBack=this.handleBack.bind(this);
  }
  handleBack(){
    this.props.history.goBack('/')
  }

  render() {

    const { itemView } = this.props
    const { dateAdded, itemName, manufacturingCompany, currentStock,viewItemLoader } = itemView
  
    const datenew = moment(dateAdded).format('YYYY-MM-DD')
    console.log(itemView, 'item')
    return (
    <div>
      {
        viewItemLoader ? <Backdrop open>
         <CircularProgress color="inherit" />
                </Backdrop>
                :
      <div style={newDesign} >




        <h3>ItemName: ------------------------- {itemName}</h3>
     <h3>ManufacturingCompany: ---------         {manufacturingCompany}</h3>
        <h3>CurrentStock: ---------------------- {currentStock}</h3>
        <h3>Added-On -------------------------- {datenew}</h3>
        <div className="buttonDesign">    <Button style={{ backgroundColor: "#6cc7e6", margin: 12 }} onClick={this.handleBack}>
          Back
        </Button>

        </div>
      
      
      </div>}
      </div>

    )
  }
}


const mapStateToProps = state => {

  return {
    itemView: state.particularItemDetail,
    viewLoader:state.viewItemLoader
  }
}


const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticularItem)
