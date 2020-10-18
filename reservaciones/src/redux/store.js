import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

// Reducers que seran los encargados de manejar la data de la aplicación
import rootReducer from './Reducers/rootReducers';
// en cargado de controlar los side effects o api calls
import rootSaga from './Sagas/rootSagas';

const configureStore = ( ) => {
    // crea el  redux-saga middleware
    const sagaMiddleware = createSagaMiddleware();
	return {
		...createStore(
            rootReducer,
            applyMiddleware(sagaMiddleware)
        ),
        // run index sagas saga: Function: a Generator function
        runSaga: sagaMiddleware.run(rootSaga, {})
	};
};

export default configureStore; 