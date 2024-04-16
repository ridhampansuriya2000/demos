import { auth, IAuth } from './Auth';
import { commonLoader, ICommonLoader } from './CommonLoader';
import {task, Itask} from "./Task";



const initialState = () => ({
    task : {},
    list : {},
    auth: auth(),
    commonLoader : commonLoader(),
    commonToaster: {
        type: '',
        toaster: false,
        message: '',
    },
});

export {
    initialState,
    auth,
    commonLoader,
    task,
};

export type {
    IAuth
}
export type {
    ICommonLoader
}

export type {
    Itask
}