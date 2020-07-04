import React, { useState } from "react";
import Modal from "./shared/Modal";
import AddLocationForm from "./AddLocationForm";

const Header = () => {
  const [modal, setModal] = useState(false);
  // console.log("rendering header", modal);

  return (
    <section className="d-flex justify-content-between align-items center py-3">
      <strong className="text-secondary">Locations</strong>
      <button
        className={"btn formButton rounded-pill text-white primaryBg"}
        onClick={() => setModal(true)}
      >
        <strong>+ Add Location</strong>
      </button>
      <Modal modal={modal} onClose={() => setModal(false)}>
        <AddLocationForm toggle={() => setModal(false)} />
      </Modal>
    </section>
  );
};

export default Header;
