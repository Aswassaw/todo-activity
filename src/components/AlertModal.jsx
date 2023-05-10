import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

export default function AlertModal({ text }) {
  return (
    <>
      <button
        className="d-none"
        id="showAlertModal"
        data-bs-toggle="modal"
        data-bs-target="#alertModal"
      >
        Alert Modal
      </button>

      <div
        className="modal fade"
        id="alertModal"
        tabIndex="-1"
        aria-labelledby="alertModalLabel"
        aria-hidden="true"
        data-cy="modal-information"
      >
        <div className="modal-dialog modal-dialog-centered">
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
        </div>
      </div>
    </>
  );
}
