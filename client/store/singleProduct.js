import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})

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

/**
 * REDUCER
 */

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
