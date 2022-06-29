import {
  ADD_USERS_FAILURE, ADD_USERS_REQUEST, ADD_USERS_SUCCESS,
  FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  DELETE_USERS_FAILURE, DELETE_USERS_REQUEST, DELETE_USERS_SUCCESS
  , SET_ITEM_DETAIL, EDIT_USERS_FAILURE, EDIT_USERS_REQUEST, EDIT_USERS_SUCCESS,
  VIEW_USERS_REQUEST, VIEW_USERS_FAILURE, VIEW_USERS_SUCCESS,
  INCORDEC_STOCK_FAILURE,INCORDEC_STOCK_REQUEST,INCORDEC_STOCK_SUCCESS,
  FETCH_CURRENTSTOCK_FAILURE,FETCH_CURRENTSTOCK_REQUEST,FETCH_CURRENTSTOCK_SUCCESS
} from './Actiontype'

const initialState = {
  individualItemDetail: {},
  loading: false,
  users: [],
  error: '',
  particularItemDetail: {},
  viewItemLoader:false,
  showCurrentStocks:Number
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:

      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload
      }
    case DELETE_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_USERS_SUCCESS:

      return {
        ...state,
        loading: false,
        error: ''
      }
    case DELETE_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case ADD_USERS_REQUEST:
      return {
        ...state,

      }
    case ADD_USERS_SUCCESS:

      return {
        ...state,

        error: ''
      }
    case ADD_USERS_FAILURE:
      return {
        ...state,

        error: action.payload
      }
    case SET_ITEM_DETAIL:
      const tempObject = {}
      const itemDetails = action.payload
      tempObject['itemName'] = itemDetails.itemName
      tempObject['manufacturingCompany'] = itemDetails.manufacturingCompany
      tempObject['currentStock'] = itemDetails.currentStock
      return {
        ...state,
        individualItemDetail: tempObject

      }
    case EDIT_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case EDIT_USERS_SUCCESS:

      return {
        ...state,
        loading: false,
        error: ''
      }
    case EDIT_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case VIEW_USERS_REQUEST:
      return {
        ...state,
        viewItemLoader: true
      }
    case VIEW_USERS_SUCCESS:
      const partuclarDetails = {}
      const detailsItem = action.payload.product
      partuclarDetails['itemName'] = detailsItem.itemName
      partuclarDetails['manufacturingCompany'] = detailsItem.manufacturingCompany
      partuclarDetails['currentStock'] = detailsItem.currentStock
      partuclarDetails['dateAdded'] = detailsItem.dateAdded

      return {
        ...state,

        particularItemDetail: partuclarDetails,
        error: ''
      }
    case VIEW_USERS_FAILURE:
      return {
        ...state,
        viewItemLoader: false,
        error: action.payload
      }
      case INCORDEC_STOCK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case INCORDEC_STOCK_SUCCESS:

      return {
        ...state,
        loading: false,
        error: ''
      }
    case INCORDEC_STOCK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      case FETCH_CURRENTSTOCK_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_CURRENTSTOCK_SUCCESS:
      
  
        return {
          ...state,
          loading: false,
          showCurrentStocks:action.payload,
          error: ''
        }
      case FETCH_CURRENTSTOCK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
    default: return state
  }
}

export default userReducer