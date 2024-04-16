import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ListBlock from "../ListBlock/ListBlock";
import initData from './initial_data';
import styles from "./Board.module.css";
import {fetchTasks, updateList} from "../../../../Redux/Actions/Dashboard";

interface BoardProps {
    setModalOpen : any
}

interface State {
    [key: string]: any;
}

const Board: React.FC<BoardProps> = ({setModalOpen}) => {
    const dispatch = useDispatch();
    const { task, list } = useSelector((state: any) =>({
        task : state.task,
        list : state.list
    }));

    const [boardState, setBoardState] = useState<State>({
        task: structuredClone(task),
        list: structuredClone(list),
        contentOption: "",
        boardList: Object.keys(list),
        onClickTaskId: "",
    });

    useEffect(()=>{
        dispatch(fetchTasks());
    },[]);

    useEffect(()=>{
        setBoardState((prevState => ({
            ...prevState,
            boardList : Object.keys(list)
        })))
    },[JSON.stringify(task),JSON.stringify(list)])


    const onDragStart = (result: any) => {
        console.log("onDragStart");
    };

    const onDragUpdate = (result: any) => {
        console.log({ result });
    };

    const onDragEnd = async (result: any) => {
        // debugger
        const { draggableId, destination, source, type } = result;
        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return;
        }
        if (type === "task") {
            console.log("onDragEnd",result, draggableId, destination , source, type);
            const startList = list[source.droppableId];
            const endList = list[destination.droppableId];
            let startTaskOrder = Array.from(startList.taskList);
            let endTaskOrder = Array.from(endList.taskList);

            if (startList === endList) {
                console.log("--------------SAME LIST---------------");
                startTaskOrder.splice(source.index, 1);
                startTaskOrder.splice(destination.index, 0, draggableId);
                startList.taskList = startTaskOrder;
                setBoardState({
                    ...boardState,
                    list: {
                        ...list,
                        [startList._id]: startList,
                        [endList._id]: endList,
                    },
                });
            } else {
                console.log("--------------DIFFERENT LIST-----------------");
                if (endTaskOrder.length === 0) {
                    console.log("EMPTY ARRAY!!");
                }
                startTaskOrder.splice(source.index, 1);
                endTaskOrder.splice(destination.index, 0, draggableId);
                startList.taskList = startTaskOrder;
                endList.taskList = endTaskOrder;
                console.log("endList",endList)
                console.log("onDragEnd 123",{_id: draggableId, taskStatus : destination.droppableId});
                await dispatch(updateList({_id: draggableId,source,destination, task : {taskStatus : destination.droppableId}}));

            }
        }
        if (type === "list") {
            console.log("onDragEnd");
            console.log("start index as " + result.source.index);
            console.log("end index as " + result.destination.index);
            let tp_list = Array.from(boardState.boardList);
            tp_list.splice(source.index, 1);
            tp_list.splice(destination.index, 0, draggableId);
            setBoardState({
                ...boardState,
                boardList: tp_list,
            });
        }
    };

    const taskOnClick = (id: string, taskDetails: any) => {
        setModalOpen(()=>({id,isOpen : true, taskDetails}));
    };

    const listBlocks = React.useMemo(()=>boardState.boardList.map((listBlock: any, idx: any) => (
        <ListBlock
            key={listBlock}
            draggableId={listBlock}
            index={idx}
            title={list[listBlock].title}
            task={task}
            taskList={list[listBlock].taskList}
            taskOnClick={(id,taskDetails) => taskOnClick(id,taskDetails)}
        />
    )),[JSON.stringify({boardNames : boardState.boardList, task, list})]);

    return (
        <div className={`${styles.App} ${boardState.contentOption}`}>
            <div className={`${styles.content}`}>
                <DragDropContext
                    onDragStart={onDragStart}
                    onDragUpdate={onDragUpdate}
                    onDragEnd={onDragEnd}
                >
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                        {(provided, snapshot) => (
                            <div
                                className={styles.main_content}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {listBlocks}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Board;
