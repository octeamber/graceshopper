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

export const fetchCartProducts = () => async dispatch => {
  try {
    const response = await axios.get('/api/carts')

    const products = response.data.map(product => ({
      ...product,
      orderQty: product.cartData.qty
    }))

    products.forEach(product => delete product.cartData)

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
    await axios.put(`/api/carts/${productId}`, {qty: newQty})
    dispatch(editQty(productId, newQty))
  } catch (error) {
    console.error('SOMETHING WENT WRONG CHANGING QTY ', error)
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/carts/${productId}`)
      dispatch(removeProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutProducts = () => async dispatch => {
  try {
    const response = await axios.put('/api/carts')
    const order = response.data
    dispatch(checkout())
    return order.id
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
