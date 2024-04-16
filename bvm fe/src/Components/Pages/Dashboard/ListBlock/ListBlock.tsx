// ListBlock.tsx
import React from "react";
import styles from "./listBlock.module.css";
import Task from "./Task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {updateList} from "../../../../Redux/Actions/Dashboard";

interface ListBlockProps {
    taskList: string[];
    task: { [key: string]: any };
    title: string;
    draggableId: string;
    index: number;
    taskOnClick: (id: string, taskDetails: any) => void;
}

const ListBlock: React.FC<ListBlockProps> = ({
                                                 taskList,
                                                 task,
                                                 title,
                                                 draggableId,
                                                 index,
                                                 taskOnClick,
                                             }) => {

    const dispatch = useDispatch();

    React.useEffect(()=>{
        // dispatch(updateList({list : {fdfds:"dsasd"}}));
    },[])
    // pass a function to map
    const tasks = React.useMemo(()=>taskList.map((taskId, idx) => (
        <Task
            key={taskId}
            draggableId={taskId}
            index={idx}
            // taskId={task[taskId].id}
            priority={task[taskId].priority}
            content={task[taskId].description}
            date={task[taskId].createDate}
            type={task[taskId].title}
            taskOnClick={(id) => taskOnClick(id, task[taskId])}
        />
    )),[JSON.stringify(task)]);


    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) => (
                <div
                    className={styles.listBlock}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    draggable
                >
                    <div className={styles.blockHead} {...provided.dragHandleProps}>
                        <div className={styles.listName}>
                            <span>{title}</span>
                        </div>
                    </div>

                    <Droppable droppableId={draggableId} type="task">
                        {(provided) => (
                            <div
                                className={styles.listContent}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {tasks}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

export default ListBlock;
