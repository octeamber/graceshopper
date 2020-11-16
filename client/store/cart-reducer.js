import axios from 'axios'

//Dummy data
// const orderId = 5
// const products = [
//   {
//     id: 8,
//     name: 'Creamsicle Mug',
//     price: 2400,
//     description: 'A good coffee mug.',
//     qty: 10,
//     imageUrl: '../images/creamsicle_mug.jpg',
//     orderQty: 2
//   },
//   {
//     id: 4,
//     name: 'Pink Mug',
//     price: 2000,
//     description: 'A small coffee mug.',
//     qty: 10,
//     imageUrl: '../images/pink_mug.jpg',
//     orderQty: 4
//   }
// ]
// const aProduct = {
//   id: 13,
//   name: 'Salt Jar',
//   price: 4000,
//   description: 'A lidded jar for salt on your counter.',
//   qty: 10,
//   imageUrl: '../images/salt_jar.jpg'
// }
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
const setProducts = products => ({type: SET_PRODUCTS, products}) // SETS THE PRODUCTS
const addProduct = (product, orderQty) => ({
  type: ADD_PRODUCT,
  product,
  orderQty
}) // TAKES THE WHOLE PRODUCT FROM SINGLE PRODUCT AND THE ORDER QTY FROM ITS REACT COMPONENT
const editQty = (productId, newQty) => ({type: EDIT_QTY, productId, newQty}) // EDITS THE QTY IN THE FRONT END
const removeProduct = productId => ({type: REMOVE_PRODUCT, productId})
const checkout = orderId => ({type: CHECKOUT, orderId}) //IN THE FRONT END THIS JUST CLEARS THE STATE AND SETS THE ORDER ID IN STATE
/**
 * THUNK CREATORS
 */

export const fetchCartProducts = () => async dispatch => {
  try {
    const response = await axios.get('/api/orders/cart')
    const products = response.data
    dispatch(setProducts(products))
  } catch (error) {
    console.error('SOMETHING WENT WRONG SETTING PRODUCTS ', error)
  }
}

export const addProductToCart = (product, orderQty) => async dispatch => {
  try {
    await axios.post(`/api/orders/`, {qty: orderQty, id: product.id})
    dispatch(addProduct(product, orderQty))
  } catch (error) {
    console.error('SOMETHING WENT WRONG ADDING PRODUCT ', error)
  }
}

export const changeQty = (productId, newQty) => async dispatch => {
  try {
    // await axios.put('/api/orders', {productId, qty: newQty})
    dispatch(editQty(productId, newQty))
  } catch (error) {
    console.error('SOMETHING WENT WRONG CHANGING QTY ', error)
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      // await axios.delete(`/api/orders/cart/${productId}`)
      dispatch(removeProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutProducts = () => async dispatch => {
  try {
    // const response = await axios.put('/api/orders/cart')
    // const orderId = response.data
    dispatch(checkout())
    return orderId
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
