import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("portal-root");

const Modal = ({ modal, onClose, children }) => {
  useEffect(() => {
    const body = document.body;
    if (modal) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [modal]);

  if (!modal) return <></>;

  return ReactDOM.createPortal(
    <div className="backDropStyle" onClick={onClose}>
      <section className="modalStyle" onClick={(e) => e.stopPropagation()}>
        {children}
      </section>
    </div>,
    modalRoot
  );
};

export default React.memo(Modal);
