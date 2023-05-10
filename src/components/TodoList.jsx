import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPrimitiveDot } from "react-icons/go";

export default function TodoList({ todo, deleteTodo, finishTodo }) {
  const [selectedTodo, setSelectedActivity] = useState(null);

  console.log(todo);

  return (
    <div className="mt-4">
      {todo?.map((td) => (
        <div key={td.id} className="card my-3 shadow border-0 p-2">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <div className="form-check">
                  <input
                    style={{ width: "25px", height: "25px" }}
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => finishTodo(td.id, td.is_active)}
                    checked={!td.is_active}
                  />
                </div>
                <span
                  className="mx-2 mb-1 fs-3"
                  style={{
                    color: `${
                      td.priority === "very-high"
                        ? "#ED4C5C"
                        : td.priority === "high"
                        ? "#F8A541"
                        : td.priority === "normal"
                        ? "#00A790"
                        : td.priority === "low"
                        ? "#428BC1"
                        : td.priority === "very-low"
                        ? "#8942C1"
                        : ""
                    }`,
                  }}
                >
                  <GoPrimitiveDot />
                </span>
                <span className={`fw-bold ${!td.is_active && "finished"}`}>
                  {td.title}
                </span>
              </div>
              <div>
                <div
                  className="pointer"
                  onClick={() => setSelectedActivity(td)}
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <RiDeleteBin6Line className="fs-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <DeleteModal
        text="Apakah anda yakin menghapus todo"
        item={selectedTodo}
        deleteAction={deleteTodo}
      />
    </div>
  );
}
