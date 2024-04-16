import React from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import styles from "./task.module.css";
import CalenderIcon from "../../../../Assest/svgicons/CalenderIcon";

function formatDate(inputDate : string) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date(inputDate);
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthName} ${day}, ${year}`;
}

interface TaskProps {
    draggableId: string;
    index: number;
    priority: string;
    content: string;
    date: string;
    type: string;
    taskOnClick: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ draggableId, index, priority, content, date, type, taskOnClick }) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div
                    className={styles.task}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    draggable
                    {...provided.dragHandleProps}
                    onClick={() => taskOnClick(draggableId)}
                >
                    <div>
                        <div className={styles.t_head}>
                            <div className={`${styles.t_priority} ${styles[priority]}`}>
                                {type}
                            </div>
                            <div className={styles.t_done}>
                                <div className={styles.bar}>done</div>
                            </div>
                        </div>
                        <div className={styles.t_content}>
                            <div className={styles.t_contentText}>{content}</div>
                        </div>
                    </div>
                    <div className={styles.t_content}>
                        <CalenderIcon/><span className={styles.t_content_text_date}>{formatDate(date)}</span>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;