import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_PRODUCTS = 'SET_PRODUCTS'
const EDIT_QTY = 'EDIT_QTY'
const REMOVE_PRODUCT = 'REMOVE_PRODUCTS'
const CHECKOUT = 'CHECKOUT'
const ADD_PRODUCT = 'ADD_PRODUCT'

let cartStorage = null
function storeLocal(id, orderQty) {
  //need to store product and orderQty for each product
  if (!cartStorage) {
    cartStorage = window.localStorage
    cartStorage.setItem(id, orderQty)
    console.log(cartStorage)
  } else {
    cartStorage.setItem(id, orderQty)
    console.log(cartStorage)
  }
}

function editLocalStorageQty(id, orderQty) {
  localStorage.removeItem(id)
  localStorage.setItem(id, orderQty)
}

function deleteLocalStorageItem(productId) {
  localStorage.removeItem(productId)
}

/**
 * ACTION CREATORS
 */
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

const addProduct = (product, orderQty) => ({
  type: ADD_PRODUCT,
  product,
  orderQty
})

const editQty = (productId, newQty) => ({
  type: EDIT_QTY,
  productId,
  newQty
})

const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
})

const checkout = orderId => ({
  type: CHECKOUT,
  orderId
})

/**
 * THUNK CREATORS
 */

export const fetchCartProducts = () => async (dispatch, getState) => {
  const id = getState().user.id
  try {
    if (id) {
      const response = await axios.get('/api/carts')

      const products = response.data.map(product => ({
        ...product,
        orderQty: product.cartData.qty
      }))

      products.forEach(product => delete product.cartData)

      dispatch(setProducts(products))
    } else {
      dispatch(setProducts([]))
    }
  } catch (error) {
    console.error('SOMETHING WENT WRONG SETTING PRODUCTS ', error)
  }
}

export const addProductToCart = (product, orderQty, id) => async dispatch => {
  try {
    if (id) {
      await axios.post(`/api/orders/`, {qty: orderQty, id: product.id})
      dispatch(addProduct(product, orderQty))
    } else {
      storeLocal(product.id, orderQty)
      dispatch(addProduct(product, orderQty))
    }
  } catch (error) {
    console.error('SOMETHING WENT WRONG ADDING PRODUCT ', error)
  }
}

export const changeQty = (productId, newQty, id) => async dispatch => {
  try {
    if (id) {
      await axios.put(`/api/carts/${productId}`, {qty: newQty})
      dispatch(editQty(productId, newQty))
    } else {
      dispatch(editQty(productId, newQty))
      editLocalStorageQty(productId, newQty)
    }
  } catch (error) {
    console.error('SOMETHING WENT WRONG CHANGING QTY ', error)
  }
}

export const deleteProduct = (productId, id) => {
  return async dispatch => {
    try {
      if (id) {
        await axios.delete(`/api/carts/${productId}`)
        dispatch(removeProduct(productId))
      } else {
        dispatch(removeProduct(productId))
        console.log('THE ID', productId)
        deleteLocalStorageItem(productId)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutProducts = id => async dispatch => {
  try {
    if (id) {
      const response = await axios.put('/api/carts')
      const order = response.data
      dispatch(checkout())
      return order.id
    } else {
      dispatch(checkout())
      return Math.floor(100 * Math.random())
    }
  } catch (error) {
    console.error('SOMETHING WENT WRONG CHEKING OUT ', error)
  }
}

//Initial State
const initialState = []
/**
 * REDUCER
 */

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products

    case ADD_PRODUCT: {
      if (state.find(product => product.id === action.product.id))
        return state.map(
          product =>
            product.id === action.product.id
              ? {...product, orderQty: product.orderQty + action.orderQty}
              : product
        )
      return [...state, {...action.product, orderQty: action.orderQty}]
    }

    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.productId)

    case EDIT_QTY:
      return state.map(
        product =>
          product.id === action.productId
            ? {...product, orderQty: action.newQty}
            : product
      )

    case CHECKOUT:
      return []

    default:
      return state
  }
}
