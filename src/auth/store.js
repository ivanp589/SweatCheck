import {applyMiddleware, compose, createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {combineReducers} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import {sessionService} from 'redux-react-session';


const initialState = {};
const middlewares = [thunk];

const store = configureStore({reducer: rootReducer}, initialState, compose(applyMiddleware(...middlewares)));

sessionService.initSessionService(store);

export default store;
