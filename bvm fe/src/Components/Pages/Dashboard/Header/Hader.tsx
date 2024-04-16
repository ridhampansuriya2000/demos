import React, {useState} from "react";
import style from "./Header.module.css";
import Button from "../../../Views/Button/Button";

const Header = ({setModalOpen} : any) => {


    return (
            <div className={style.header}>
                <div className={style.mainTitle}>Dashboard</div>
                <Button
                    onClick={() => setModalOpen({isOpen : true, id :''})}
                    startIcon={<b>+</b>}
                    text="Crear tarea"
                    sx={{
                        backgroundColor: "#000000",
                        color: "#FFFFFF",
                        mr: "20px",
                    }}
                />
            </div>
    )
};

export default Header;