import React, { useState } from "react";
import Select from "react-select";
import { GoPrimitiveDot } from "react-icons/go";

const options = [
  { value: "very-high", label: "Very High" },
  { value: "high", label: "High" },
  { value: "normal", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "very-low", label: "Very Low" },
];

const getOptionLabel = (option) => {
  switch (option.value) {
    case "very-high":
      return (
        <div data-cy={`modal-add-priority-item`}>
          <div data-cy={`modal-add-priority-very-high`}>
            <span style={{ color: "#ED4C5C" }}>
              <GoPrimitiveDot />
            </span>{" "}
            {option.label}
          </div>
        </div>
      );
    case "high":
      return (
        <div data-cy={`modal-add-priority-item`}>
          <div data-cy={`modal-add-priority-high`}>
            <span style={{ color: "#F8A541" }}>
              <GoPrimitiveDot />
            </span>{" "}
            {option.label}
          </div>
        </div>
      );
    case "normal":
      return (
        <div data-cy={`modal-add-priority-item`}>
          <div data-cy={`modal-add-priority-medium`}>
            <span style={{ color: "#00A790" }}>
              <GoPrimitiveDot />
            </span>{" "}
            {option.label}
          </div>
        </div>
      );
    case "low":
      return (
        <div data-cy={`modal-add-priority-item`}>
          <div data-cy={`modal-add-priority-low`}>
            <span style={{ color: "#428BC1" }}>
              <GoPrimitiveDot />
            </span>{" "}
            {option.label}
          </div>
        </div>
      );
    case "very-low":
      return (
        <div data-cy={`modal-add-priority-item`}>
          <div data-cy={`modal-add-priority-very-low`}>
            <span style={{ color: "#8942C1" }}>
              <GoPrimitiveDot />
            </span>{" "}
            {option.label}
          </div>
        </div>
      );
    default:
      return (
        <div data-cy={`modal-add-priority-item`}>
          <div data-cy={`modal-add-priority-another`}>
            <span>
              <GoPrimitiveDot />
            </span>{" "}
            {option.label}
          </div>
        </div>
      );
  }
};

export default function CreateModal({ loading, createAction }) {
  const [listItemName, setListItemName] = useState("");
  const [priority, setPriority] = useState(null);

  const reset = () => {
    setListItemName("");
    setPriority(null);
  };

  return (
    <div
      data-cy="modal-add"
      className="modal fade"
      id="createModal"
      tabIndex="-1"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header px-5">
            <h1
              data-cy={`modal-add-title`}
              className="modal-title fs-5"
              id="staticBackdropLabel"
            >
              Tambah List Item
            </h1>
            <button
              data-cy={`modal-add-close-button`}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-5 row d-flex">
            <div className="mb-3">
              <label
                data-cy={`modal-add-name-title`}
                htmlFor="listItemName"
                className="form-label fw-bold"
              >
                NAMA LIST ITEM
              </label>
              <input
                data-cy={`modal-add-name-input`}
                type="text"
                value={listItemName}
                onChange={(e) => setListItemName(e.target.value)}
                className="form-control form-control-lg"
                id="listItemName"
                placeholder="Tambahkan nama Activity"
              />
            </div>
            <div className="mb-3" style={{ maxWidth: "300px" }}>
              <label
                data-cy={`modal-add-priority-title`}
                htmlFor="priority"
                className="form-label fw-bold"
              >
                PRIORITY
              </label>
              <div data-cy={`modal-add-priority-dropdown`}>
                <Select
                  value={priority}
                  className="form-control form-control-lg p-0 border-0"
                  onChange={(selected) => setPriority(selected)}
                  options={options}
                  placeholder="Select Priority"
                  getOptionLabel={getOptionLabel}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer px-5">
            <button
              type="button"
              className="btn btn-secondary d-none"
              data-bs-dismiss="modal"
              id="closeCreateModal"
            >
              Close
            </button>
            {loading ? (
              <button
                style={{ fontSize: "18px" }}
                className="btn btn-custom btn-blue text-white py-3 px-4 fw-bold rounded-pill"
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            ) : (
              <button
                data-cy={`modal-add-save-button`}
                style={{ fontSize: "18px" }}
                disabled={listItemName && priority ? false : true}
                className="btn btn-custom btn-blue text-white py-3 px-4 fw-bold rounded-pill"
                onClick={() =>
                  createAction(
                    { listItemName, priority: priority.value },
                    reset
                  )
                }
              >
                Simpan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
