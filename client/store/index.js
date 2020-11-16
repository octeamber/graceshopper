import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
// need to rename the following file to products (plural)
import productsReducer from './product'
import cart from './cart-reducer'
import productReducer from './singleProduct'

const reducer = combineReducers({
  user,
  products: productsReducer,
  product: productReducer,
  cart
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
