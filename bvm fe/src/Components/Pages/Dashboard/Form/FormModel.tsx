import React, { useState } from "react";
import {Box} from "@mui/material";
import TextFields from "../../../Views/Textfield/TextFields";
import styles from "../Form/FormModel.module.css";
import Radio from "@mui/material/Radio/Radio";
import Button from "../../../Views/Button/Button";

const FormModel = ({onSubmit, actionTxt, taskDetails} : any) => {

    const [formValue, setFormValue] = useState({
        name: taskDetails?.description ?? '',
        type: taskDetails?.title ?? '',
    })

    const stateHandler = (e : any) => {
        let {name, value} : any = e.target;
        setFormValue((preState : any)=>({
            ...preState,
            [name] : value
        }))
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(formValue);
        // Here you can add your logic to handle form submission
        // console.log("Form submitted:", { name, email, message });
    };

    const controlProps = (item: string) => ({
        checked: formValue?.type === item,
        onChange: stateHandler,
        value: item,
        id: item,
        name: 'type',
        inputProps: { 'aria-label': item },
    });
    const RedioGroup = (item : string) =>{

        return(
            <div className={styles.RadioGroup}>
                <Radio
                    {...controlProps(item)}
                    sx={{
                        color: "#000000",
                        '&.Mui-checked': {
                            color: "#000000",
                        },
                    }}
                />
                <label>{item}</label>
            </div>
        )
    }

    return (
        <div>
            <div className={styles.formContentText}>
                Make changes to your tasks here. Click save when you're done.
            </div>
            <div className={styles.fieldBox}>
                <label>Name</label>
                <TextFields
                    type='text'
                    name='name'
                    placeholder='Task Name'
                    value={formValue.name}
                    onChange={stateHandler} />
            </div>

            <div className={styles.fieldBox}>
                <label>Type</label>
                <div className={styles.radioGroupBox}>
                    {['Front-end',"Design","Back-end","Devops"].map((item)=>(RedioGroup(item)))}
                </div>
            </div>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "20px",
                }}
            >

                <Button
                    onClick={handleSubmit}
                    text={actionTxt ??  "Ok"}
                    sx={{ backgroundColor: "#0F172A", color: "#ffffff" }}
                />

            </Box>
        </div>
    );
};

export default FormModel;
