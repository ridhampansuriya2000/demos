import React, { useState } from "react";
import { styled } from "@mui/system";
import { Box, Typography, Modal as MuiModal } from "@mui/material";
import Modal from '@mui/material/Modal';
import { IProps } from "./Model.types";
import { MdClose } from "react-icons/md";
import FormModel from "../Form/FormModel";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Modal1 = ({
                   sx,
                   open,
                   onSubmit,
                   onClose,
                   body,
                   headding,
                   cancelIcon,
                   actionBtn,
                   actionTxt,
                   ...props
               }: IProps) => {
    // CustomModal component styling
    const CustomModal = styled(Modal)(({ theme }) => ({}));

    const [formValue, setFormValue] = useState({
        name: '',
        type: '',
    })

    return (
        <>
            <CustomModal open={true} onSubmit={onSubmit} {...props}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        maxWidth: "400px",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "10px",
                        ...sx,
                    }}
                >
                    {/* Modal header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <h2>{headding || ""}</h2>
                        {/* Cancel icon */}
                        <Box sx={{ cursor: "pointer", fontSize: "24px" }}>
                            {" "}
                            {cancelIcon && (
                                <Box onClick={onClose}>
                                    <MdClose />
                                </Box>
                            )}
                        </Box>
                    </Box>
                    {/* Modal body */}
                    {/*{body(setFormValue, formValue)}*/}
                    <FormModel actionTxt={actionTxt} onSubmit={onSubmit} taskDetails={open.taskDetails}/>
                    {/* Cancel button */}

                </Box>
            </CustomModal>
        </>
    );
};

export default Modal1;
