import React, {useState} from 'react';
import style from '../Dashboard/dash.module.css';
import Board from "./Board/Board";
import {addTask, updateList} from "../../../Redux/Actions/Dashboard";
import {useDispatch} from "react-redux";
import Header from "./Header/Hader";
import Modal from "./Model/Modal";

const Dashboard = () => {

    const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState({isOpen : false, id:''});

  return (
    <>
      <div className={style.branch_main}>
          <Header setModalOpen={setModalOpen}  />
          <Board setModalOpen={setModalOpen} />
      </div>

        {modalOpen.isOpen && <Modal
            open={modalOpen}
            onClose={() => setModalOpen({isOpen: false,id:''})}
            onSubmit={(payload: any) => {
                let task = {
                    description: payload.name,
                    title: payload.type,
                }
                !modalOpen.id ? dispatch(addTask({task})) :
                    dispatch(updateList({_id:modalOpen.id, task }))
                setModalOpen({isOpen: false,id:''});
            }}
            sx={{maxWidth: '450px'}}
            headding={`${modalOpen.id ? 'Edit task' : "Add Task"}`}
            actionBtn={true}
            actionTxt={`${modalOpen.id ? 'Save changes' : "Save"}`}
            cancelIcon
        />}
    </>
  );
};

export default Dashboard;
