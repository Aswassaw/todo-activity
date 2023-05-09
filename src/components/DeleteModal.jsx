import React from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function DeleteModal({ text, item, deleteAction }) {
  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body p-5 row d-flex">
            <p
              data-cy="modal-delete-icon"
              className="display-2 text-center text-danger"
            >
              <HiOutlineExclamationTriangle />
            </p>
            <p data-cy="modal-delete-title" className="text-center fs-5">
              {text} “<span className="fw-bold">{item && item.title}</span>
              ”?
            </p>
            <div className="d-flex justify-content-between">
              <button
                style={{ fontSize: "18px" }}
                type="button"
                data-cy="modal-delete-cancel-button"
                className="btn btn-custom btn-light py-3 px-4 fw-bold rounded-pill"
                id="deleteModalClose"
                data-bs-dismiss="modal"
              >
                Batal
              </button>
              <button
                style={{ fontSize: "18px" }}
                type="button"
                data-cy="modal-delete-confirm-button"
                className="btn btn-custom btn-red text-white py-3 px-4 fw-bold rounded-pill"
                onClick={() => {
                  deleteAction(item.id);
                  document.getElementById("deleteModalClose").click();
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
