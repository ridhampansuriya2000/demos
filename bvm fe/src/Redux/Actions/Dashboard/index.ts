import {ADD_TASK, GET_TASK, UPDATE_LIST} from "./index.actionType";
import { SuccessActionCallback } from "../index.type";

export * from "./index.actionType"
export * from "./index.types"

export const updateList = ({_id, source, destination, task} : any) => {
    console.log("task------>",{_id, source, destination, task})
    return ({
        // toaster : {
        //     success : true,
        //     error:true,
        // },
        type: UPDATE_LIST,
        axiosAction: true,
        method: "Put",
        url: `api/task/${_id}?getTasks=true&getTaskStatuses=true`,
        payload: task,
        onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
            const copyState = structuredClone(state);
            return (source && destination) ? {
                ...copyState,
                task : {...copyState.task, [_id] : {...copyState.task[_id],...task}/*...response.tasks*/},
                list: {
                    ...copyState.list,
                    [source.droppableId]: { ...copyState.list[source.droppableId], taskList : [...copyState.list[source.droppableId].taskList.filter((id : any) => id !== _id)]},
                    [destination.droppableId]: {...copyState.list[destination.droppableId], taskList : [...copyState.list[destination.droppableId].taskList]}
                }
            } :
                {
                    ...copyState,
                    task : { ...copyState.task, [_id] : {...copyState.task[_id], ...task} }
                }
        }
    })};

export const addTask = ({task} : any) => {
    return ({
        type: ADD_TASK,
        axiosAction: true,
        method: "Post",
        url: `api/task/?getTasks=true&getTaskStatuses=true`,
        payload: task,
        onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
            return {
                ...state,
                list :{...response.taskStatuses},
                task : {...response.tasks}
            }
        }
    })};

export const fetchTasks = () => {
    return ({
        type: GET_TASK,
        axiosAction: true,
        method: "Get",
        url: `api/tasks/?getTaskStatuses=true`,
        onSuccess: ({ state, payload, response }: SuccessActionCallback) => {
            return {
                ...state,
                list :{...response.taskStatuses},
                task : {...response.updatedData}
            }
        }
    })};