import {
  compose,
  createStore,
  applyMiddleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

import rootReducer from './reducers'

const middleware = [
  thunkMiddleware,
  loggerMiddleware
]

const setupStore = (state) => {
  const store = createStore(rootReducer, state, applyMiddleware(...middleware))

  if (module.hot) module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default)
  })

  return store
}

var store

switch (process.env.NODE_ENV) {
  case 'production':
  store = setupStore(require('./state.prod.json'))
  break
  case 'development':
  store = setupStore(require('./state.dev.json'))
  break
}

export default store
