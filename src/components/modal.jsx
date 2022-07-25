import React from "react";

const Modal = ({ children }) => {
    return (
        <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
            <div className="w-72 bg-slate-300 h-52 p-2 rounded-md">{children}</div>
        </div>
    );
};

export default Modal;
