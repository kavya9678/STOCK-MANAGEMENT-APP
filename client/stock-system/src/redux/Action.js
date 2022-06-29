import axios from 'axios'


import {
  ADD_USERS_FAILURE, ADD_USERS_REQUEST, ADD_USERS_SUCCESS,
  FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  DELETE_USERS_SUCCESS, DELETE_USERS_FAILURE, DELETE_USERS_REQUEST
  , EDIT_USERS_SUCCESS, EDIT_USERS_REQUEST, EDIT_USERS_FAILURE, SET_ITEM_DETAIL,
  VIEW_USERS_REQUEST, VIEW_USERS_FAILURE, VIEW_USERS_SUCCESS,
  INCORDEC_STOCK_FAILURE,INCORDEC_STOCK_REQUEST,INCORDEC_STOCK_SUCCESS,
  FETCH_CURRENTSTOCK_FAILURE,FETCH_CURRENTSTOCK_REQUEST,FETCH_CURRENTSTOCK_SUCCESS
} from './Actiontype'

export const fetchUsers = () => {
  return function (dispatch) {
    console.log('before')
    dispatch(fetchUsersRequest())
    axios.get('http://localhost:3001/routes/viewall')
      .then(response => {
        console.log('after', response)
        dispatch(fetchUsersSuccess(response.data.data.view))
      })
      .catch(error => {
        console.log('inside catch')
        dispatch(fetchUsersFailure(error.message))
      })
  }
}


export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}


export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}


export const deleteUsers = (id) => {

  return function (dispatch) {
    dispatch(deleteUsersRequest())
    axios.delete(`http://localhost:3001/routes/delete/${id}`)
      .then(response => {

        console.log('after', response)
        dispatch(deleteUsersSuccess())
        window.location.reload()
      })
      .catch(error => {
        console.log('inside catch')
        dispatch(deleteUsersFailure(error.message))
      })

  }

}

export const deleteUsersRequest = () => {
  return {
    type: DELETE_USERS_REQUEST
  }
}


export const deleteUsersSuccess = users => {
  return {
    type: DELETE_USERS_SUCCESS,

  }
}

export const deleteUsersFailure = error => {
  return {
    type: DELETE_USERS_FAILURE,
    payload: error
  }
}
export const addUsersRequest = () => {
  return {
    type: ADD_USERS_REQUEST
  }
}


export const addUsersSuccess = () => {
  return {
    type: ADD_USERS_SUCCESS,
  
  }
}

export const addUsersFailure = error => {
  return {
    type: ADD_USERS_FAILURE,
    payload: error
  }
}
export const addUsers = (itemName, manufacturingCompany, currentStock) => {
  return function (dispatch) {
    dispatch(addUsersRequest())
    axios.post(`http://localhost:3001/routes/add`, {
      itemName,
      currentStock,
      manufacturingCompany
    })
      .then(response => {

        console.log('after', response)
        dispatch(addUsersSuccess())

      })
      .catch(error => {
        console.log('inside catch')
        dispatch(addUsersFailure(error.message))
      })

  }

}
// export const editUserRequest = (edit) => {
//   return {
//     type: EDIT_ITEM,
//     itemName:edit.itemName,
//     manufacturingCompany:edit.manufacturingCompany,
//     currentStock:edit.currentStock

//     }
//   }
export const editUsers = (itemObject) => {
  return function (dispatch) {

    dispatch(editUsersRequest())
    axios.put(`http://localhost:3001/routes/update/${itemObject._id}`,
      {
        itemName: itemObject.itemName,
        manufacturingCompany: itemObject.manufacturingCompany,
        currentStock: itemObject.currentStock
      }
    )
      .then(response => {
        console.log('after', response)
        dispatch(editUsersSuccess())
      })
      .catch(error => {
        console.log('inside catch')
        dispatch(editUsersFailure(error.message))
      })
  }

}
export const editUsersRequest = () => {
  return {
    type: EDIT_USERS_REQUEST
  }
}


export const editUsersSuccess = () => {
  return {
    type: EDIT_USERS_SUCCESS,

  }
}

export const editUsersFailure = error => {
  return {
    type: EDIT_USERS_FAILURE,
    payload: error
  }
}
export const setItemDetails = (details) => {
  return {
    type: SET_ITEM_DETAIL,
    payload: details
  }
}
export const viewUsersRequest = () => {
  return {
    type: VIEW_USERS_REQUEST,

  }
}


export const viewUsersSuccess = (products) => {
  return {
    type: VIEW_USERS_SUCCESS,
    payload: products


  }
}

export const viewUsersFailure = error => {
  return {
    type: VIEW_USERS_FAILURE,
    payload: error
  }
}



export const viewParticularUsers = (particularItemDetail) => {
  return function (dispatch) {

    dispatch(viewUsersRequest())
    axios.get(`http://localhost:3001/routes/particular/${particularItemDetail._id}`)
      .then(response => {

        dispatch(viewUsersSuccess(response.data))
      })
      .catch(error => {
        console.log('inside catch', error)
        dispatch(viewUsersFailure(error.message))
      })
  }
}


export const incordecStockRequest = () => {
  return {
    type: INCORDEC_STOCK_REQUEST,

  }
}


export const incordecStockSuccess = () => {
  return {
    type: INCORDEC_STOCK_SUCCESS


  }
}

export const incordecStockFailure = error => {
  return {
    type:INCORDEC_STOCK_FAILURE,
    payload: error
  }
}


export const changeStocks = (stocksIncorDec) => {

  return function (dispatch) {
  
    dispatch(incordecStockRequest())
    axios.put(`http://localhost:3001/routes/incordec/${stocksIncorDec._id}`,
    {
      counter:stocksIncorDec.currentStock
    })
      .then(response => {
        console.log('stocks',response)
        dispatch(incordecStockSuccess())
      })
      .catch(error => {
        console.log('inside catch', error)
        dispatch(incordecStockFailure(error.message))
      })
  }
}

export const showCurrentStockRequest = () => {
  return {
    type: FETCH_CURRENTSTOCK_REQUEST,

  }
}


export const showCurrentStockSuccess = (stocksVal) => {
  return {
    type: FETCH_CURRENTSTOCK_SUCCESS,
    payload:stocksVal


  }
}

export const showCurrentStockFailure = error => {
  return {
    type:FETCH_CURRENTSTOCK_FAILURE,
    payload: error
  }
}

export const showCurrentStock = (stock) => {

  return function (dispatch) {

  
    dispatch(showCurrentStockRequest())
    axios.get(`http://localhost:3001/routes/curStock/${stock._id}`)
      .then(response => {
        console.log('current',response.data.data)
        dispatch(showCurrentStockSuccess(response.data.data))
      })
      .catch(error => {
        console.log('inside catch', error)
        dispatch(showCurrentStockFailure(error.message))
      })
  }
}