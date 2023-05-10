import React from "react";
import Modal from "react-bootstrap/Modal";
import { BsExclamationCircle } from "react-icons/bs";

export default function AlertModal({ alertModal, showAlertModal, text }) {
  return (
    <>
      <Modal
        data-cy="modal-information"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={alertModal}
        onHide={showAlertModal}
      >
        <div className="modal-content">
          <div className="modal-body p-3">
            <p className="text-center m-0">
              <span data-cy="modal-information-icon" className="text-success">
                <BsExclamationCircle />
              </span>{" "}
              <span data-cy="modal-information-title">{text}</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
