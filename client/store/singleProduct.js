import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})

const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}
/**
 * THUNK CREATORS
 */

export const fetchProduct = id => async dispatch => {
  try {
    const response = await axios.get(`/api/products/${id}`)
    const product = response.data
    dispatch(getProduct(product))
  } catch (error) {
    console.error('Something went wrong fetching a single product ', error)
  }
}

export const putProduct = (productId, product) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/products/${productId}`, product)
      dispatch(updateProduct(product))
    } catch (err) {
      console.log(err)
    }
  }
}
/**
 * REDUCER
 */

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return {...state, ...action.product}
    default:
      return state
  }
}
