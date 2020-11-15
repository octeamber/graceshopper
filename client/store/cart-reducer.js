import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const EDIT_QTY = 'EDIT_QTY'
const REMOVE_PRODUCT = 'REMOVE_PRODUCTS'
const CHECKOUT = 'CHECKOUT'
const ADD_PRODUCT = 'ADD_PRODUCT'
/**
 * ACTION CREATORS
 */
const setProducts = products => ({type: SET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const editQty = (productId, newQty) => ({type: EDIT_QTY, productId, newQty})
const removeProduct = productId => ({type: REMOVE_PRODUCT, productId})
const checkout = orderId => ({type: CHECKOUT, orderId}) //IN THE FRONT END THIS JUST CLEARS THE STATE, IN THE BACKEND IT FLIPS THE BOLEEAN

/**
 * THUNK CREATORS
 */

export const fetchCartProducts = () => async dispatch => {
  try {
    const response = await axios.get('/api/orders/cart')
    const products = response.data
    dispatch(setProducts(products))
  } catch (error) {
    console.error('SOMETHING WENT WRONG ', error)
  }
}
export const addProductToCart = product => async dispatch => {
  try {
    await axios.put('/api/orders', {product})
    dispatch(addProduct(product))
  } catch (error) {
    console.error('SOMETHING WENT WRONG ', error)
  }
}
export const changeQty = (productId, newQty) => async dispatch => {
  try {
    await axios.put('') // HERE WE NEED TO UPDATE THE QTY FROM THE DB
    dispatch(editQty(productId, newQty))
  } catch (error) {
    console.error('SOMETHING WENT WRONG ', error)
  }
}

export const deleteProducts = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orders/cart/${productId}`)
      dispatch(removeProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutProducts = () => async dispatch => {
  try {
    const response = await axios.put('/api/orders/cart')
    const orderId = response.data
    dispatch(checkout(orderId))
  } catch (error) {
    console.error('SOMETHING WENT WRONG ', error)
  }
}
//Initial State
const initialState = {products: []} // OUR STATE IS GOING TO HOLD 2 THINGS , AN ARRAY OF PRODUCTS AND AT THE END WHEN WE CHECKOUT AN ORDER ID
/**
 * REDUCER
 */
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {products: action.products}
    case REMOVE_PRODUCT:
      return {
        products: state.products.filter(
          product => product.id !== action.productId
        )
      }
    case EDIT_QTY:
      return {
        products: state.products.map(
          product =>
            product.id === action.productId
              ? {...product, qty: action.newQty}
              : product
        )
      }
    case CHECKOUT:
      return {products: [], orderId: action.orderId}
    default:
      return state
  }
}
