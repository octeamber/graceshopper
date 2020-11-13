import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * INITIAL STATE
 */
// const defaultProducts = {}

/**
 * ACTION CREATORS
 */
const getStudent = product => ({type: GET_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const fetchProduct = id => async dispatch => {
  // somehow i'm not getting a response?
  try {
    console.log('SINGLE PRODUCT THUNK')
    const response = await axios.get(`/api/products/${id}`)
    console.log('RESPONSE IN FETCH PRODUCT', response)
    const product = response.data
    dispatch(getStudent(product))
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
