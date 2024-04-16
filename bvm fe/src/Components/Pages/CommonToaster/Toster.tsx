import React, { useState } from "react";
import ToastNotification from "../../Views/Toaster/ToastNotification";
import { useSelector,useDispatch } from "react-redux";
import { toasterStop } from "../../../Redux/Actions/Toaster";

const Toster = () => {

  const dispatch = useDispatch();
  const {type,message,toaster } = useSelector((state: any) => ({
    type: state?.commonToaster?.type,
    message: state?.commonToaster?.message,
    toaster : state?.commonToaster?.toaster,
  }));

  // React.useEffect(()=>{
  //   if(toaster)
  //   setToasterValue(()=>({
  //   toasterMsg:message,
  //   variant: type,
  //   isOpen: true,
  //   }))
  // },[toaster])

  return (
    <>
      { toaster && (
        <ToastNotification
          actionText={"cancel"}
          variant={type}
          title={message}
          open={toaster}
          duration={5000}
          gap={5}
          verticalPosition="top"
          close={() => {
             // setToasterValue({ toasterMsg: "", variant: "", isOpen: false });
             dispatch(toasterStop());
          }}
        />
      )  }
    </>
  );
};

export default Toster;
