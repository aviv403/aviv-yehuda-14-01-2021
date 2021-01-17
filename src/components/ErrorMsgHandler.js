import React from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { AiFillBell } from "react-icons/ai";

const ErrorMsgHandler = ({ msg, hasError }) => {
  const notify = () =>
    toast.error(
      <>
        <AiFillBell /> {msg}
      </>,
      {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
      }
    );
    
    if (hasError) {
      notify();
    }

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default ErrorMsgHandler;
