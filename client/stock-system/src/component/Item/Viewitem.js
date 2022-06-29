import React, { Component } from 'react'
import App from '../../App';
import { connect } from 'react-redux'
import { deleteUsers, fetchUsers, setItemDetails, viewParticularUsers, changeStocks, showCurrentStock } from '../../redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
const styling = {
  width: 1500,
  height: 140,
  paddingTop: 20,
  marginLeft: 100,
  fontSize: 16,
  backgroundColor: "white",
  marginBottom: 12,
  border: '1px solid red',
  borderColor: 'black',
  borderWidth: 2,

}
const first = {
  width: 1500,

  height: 50,
  marginLeft: 100,
  fontSize: 16,
  backgroundColor: "lightgreen",
  marginBottom: 12,
}
const title = {
  flexGrow: 1,


}
const expanded = {
  transform: 'rotate(0deg)',
  marginLeft: 'auto',
}
const wrap = {
  display: 'flex',
  flexWrap: 'nowrap',
  flexGrow: 1,
  justifyContent: 'flex-end',
  alignItems: 'first baseline'

}
const cardaction1 = {
  marginLeft: 10,
  fontSize: 24,
  flexGrow: 1,
  fontFamily: 'Times New Roman',
  alignItems: 'first baseline'



}

class Viewitem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      currentStock: '',
    
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleView = this.handleView.bind(this)
    this.togglePanel = this.togglePanel.bind(this);
    this.handleValueOfCurrentStocks=this.handleValueOfCurrentStocks.bind(this)
    this.handleCurrentStock=this.handleCurrentStock.bind(this)
    this.handleChangeStock = this.handleChangeStock.bind(this)
  }
  handleCurrentStock(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleChangeStock(id) {
    const stockIncorDec = {
    
      _id:id,
      currentStock: this.state.currentStock
    }
    console.log('idval',id)
    this.props.changeStocks(stockIncorDec)
    this.props.history.push('/')
  }
  handleValueOfCurrentStocks(id){
  
    const stock={
      _id:id,
      currentStock:this.state.currentStock
    }
  
    this.props.showCurrentStock(stock)

    this.props.history.push('/')
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open })
  }
  //view any particular item details View buttton handling
  handleView(particularItemDetail) {

    this.props.viewParticularUsers(particularItemDetail)

    this.props.history.push(`/View/${particularItemDetail._id}`)
  }
  //Edit click handling
  handleClick(user) {


    this.props.setItemDetails(user)
    this.props.history.push(`/Edit/${user._id}`)

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  componentDidMount() {
    {
      this.props.fetchUsers()

    }
  }
  render() {

    return (
      <div>
      
        <Card variant="outlined" style={first}>

          <CardActions  >
            <Typography variant="h6" style={title}>
              ItemName
            </Typography>
            <Typography variant="h6" style={title}>

            </Typography>
            <Typography variant="h6" style={title}>

            </Typography>
          
            <Typography variant="h6" style={title} >
              Edit
            </Typography>
            <Typography variant="h6" style={title}>

            </Typography>
            
            <Typography variant="h6" style={title} >
              Delete
            </Typography>
      
            <Typography variant="h6" style={title}>

            </Typography>
            <Typography variant="h6" >
              View
            </Typography>
            <Typography variant="h6" style={title}>

            </Typography>
            <Typography variant="h6" >
              Stocks
            </Typography>
          
            
          </CardActions>



        </Card>


        {this.props.isLoading ? <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
          : this.props.userData.length == 0 ? <h2 style={{ color: 'blue', display: 'center' }}>'No items present please click on add-item to  Add some item'</h2> : this.props.userData.map(user => (

            <Card variant="contained" style={styling}  >


              <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div style={cardaction1} >{user.itemName} </div>
                <div style={wrap}><Button variant="contained" style={{ backgroundColor: '#e0d316' }} onClick={() => { this.handleClick(user) }}>Edit</Button></div>
                <div style={wrap}>
                  <Button variant="contained" style={{ backgroundColor: '#e82813' }} onClick={() => { this.props.deleteUsers(user._id) }}>
                    Delete
                  </Button>
                </div>

                <div style={wrap}><Button variant="contained" style={{ backgroundColor: '#6cc7e6' }} onChange={this.handleChange} onClick={() => { this.handleView(user) }}>View</Button></div>
              
                <div style={wrap} >  <h3 style={{fontSize:25}}> Stocks:{user.currentStock}</h3>
                </div>
                { /* // <ExpandMoreIcon onClick={(e) => { this.togglePanel(e) }} />
                // <Collapse
                //   in={this.state.open} timeout="auto" unmountOnExit={true}>

                
                //   <TextField 
                //     value={this.state.currentStock}
                //     onChange={this.handleCurrentStock}
                //     id="standard-number"
                //     id="outlined-full-width" fullWidth={true}
                //     name="currentStock"
                //     label="CurrentStock"
                //     type="number"
                //     InputLabelProps={{
                //       shrink: true,
                //     }}
                //   />
                   <Button onClick={()=>{this.handleValueOfCurrentStocks(user._id)}} style={{ backgroundColor: '#d15ee6' }}> Stocks : </Button><b style={{fontSize:20}}>  {this.props.showVal.currentStock} </b> 
                 <Button style={{ backgroundColor: '#ace354' }} onClick={()=>{this.handleChangeStock(user._id)}}>Change</Button>
                 </Collapse> */
              }
              </div>
            </Card>
          ))}
        <Card>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    userData: state.users,
    isLoading: state.loading,
    showVal:state.showCurrentStocks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUsers: (id) => dispatch(deleteUsers(id)),
    setItemDetails: (user) => dispatch(setItemDetails(user)),
    viewParticularUsers: (particularItemDetail) => dispatch(viewParticularUsers(particularItemDetail)),
    changeStocks: (stockIncorDec) => dispatch(changeStocks(stockIncorDec)),
    showCurrentStock:(stock)=>dispatch(showCurrentStock(stock))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewitem)