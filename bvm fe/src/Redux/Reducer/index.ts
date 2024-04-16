import {IAction} from "./index.types";

const reducer = (state: any, {type, response, payload, callback}: IAction) => {
    console.log("reducer",{type, response, payload, callback});
    if (type.includes("_FETCHING")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    } else if (type.includes("_FAILED")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    } else if (type.includes("_SUCCESS")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    } else if (type.includes("LOADER_")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    }else if (type.includes("TOASTER_")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    } else if (type.includes("_ERROR")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    }else if (type.includes("UPDATE_LIST")) {
        return callback?.({
            state,
            response,
            payload
        }) || state
    }else  {
        return callback?.({
            state,
            response,
            payload
        }) || state
    }
};

export {reducer};