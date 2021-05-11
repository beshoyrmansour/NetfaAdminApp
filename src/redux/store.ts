
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export type AppState = ReturnType<typeof rootReducer>;

export default process.env.NODE_ENV === 'development'
    ? createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    : createStore(rootReducer, applyMiddleware(thunk));