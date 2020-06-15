import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import ActionTypes from "./action-types";

const {notation: {SetAll, SetOne, ClearData}} = ActionTypes;

const initialState = {
    list: null,
    details: null
};

const notations = (state = initialState, {type, payload}) => {
    switch (type) {
        case SetAll:
            return {
                ...state,
                list: payload
            };
        case SetOne:
            return {
                ...state,
                details: payload
            };
        case ClearData:
            return []
    }
    return state;
};

export default history => combineReducers({
    router: connectRouter(history),
    reduxAsyncConnect,
    notations
});