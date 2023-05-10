import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPen } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import EmptyItem from "../images/empty-item.png";
import CreateModal from "../components/CreateModal";
import AlertModal from "../components/AlertModal";

export default function Detail() {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [activity, setActivity] = useState({
    data: null,
    isLoading: true,
  });
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    fetchActivity();

    document.title = `To Do List - Detail`;
  }, []);

  useEffect(() => {
    const input = document.getElementById("activityInput");
    if (input) input.focus();
  }, [inputActive]);

  const fetchActivity = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/activity-groups/${urlParams.id}?email=${process.env.REACT_APP_EMAIL_ENV}`
      );

      setActivity({
        data: res.data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);

      navigate("/");

      setActivity({
        ...activity,
        isLoading: false,
      });
    }
  };

  const updateActivity = async () => {
    try {
      setActivity({
        ...activity,
        isLoading: true,
      });

      await axios.patch(
        `${process.env.REACT_APP_API_URL}/activity-groups/${urlParams.id}`,
        {
          title: activity.data.title,
        }
      );

      fetchActivity();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const createTodo = async (val, reset) => {
    try {
      setActivity({
        ...activity,
        isLoading: true,
      });

      await axios.post(`${process.env.REACT_APP_API_URL}/todo-items`, {
        title: val.listItemName,
        priority: val.priority,
        activity_group_id: urlParams.id,
      });

      fetchActivity();
      document.getElementById("closeCreateModal").click();
      reset();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setActivity({
        ...activity,
        isLoading: true,
      });

      await axios.delete(`${process.env.REACT_APP_API_URL}/todo-items/${id}`);

      fetchActivity();
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      document.getElementById("showAlertModal").click();
    }
  };

  const finishTodo = async (id, isActive) => {
    try {
      setActivity({
        ...activity,
        isLoading: true,
      });

      await axios.patch(`${process.env.REACT_APP_API_URL}/todo-items/${id}`, {
        is_active: !isActive,
      });

      fetchActivity();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const makeInputActive = () => {
    setInputActive(!inputActive);
  };

  return (
    <>
      <Navbar />
      <div className="container w-primary my-4">
        {activity.isLoading ? (
          <div className="spinner-border mt-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Link className="fs-2" to={"/"}>
                  <IoChevronBackOutline />
                </Link>
                {inputActive ? (
                  <input
                    type="text"
                    id="activityInput"
                    className="form-control mx-3 fw-bold fs-1 p-0"
                    style={{
                      boxShadow: "none",
                      border: "none",
                      borderBottom: "1px solid black",
                      backgroundColor: "#F9F9F9",
                    }}
                    value={activity.data?.title}
                    onBlur={() => {
                      makeInputActive();
                      updateActivity();
                    }}
                    onChange={(e) => {
                      setActivity({
                        ...activity,
                        data: {
                          ...activity.data,
                          title: e.target.value,
                        },
                      });
                    }}
                  />
                ) : (
                  <span className="mx-3 fw-bold fs-1" onClick={makeInputActive}>
                    {activity.data?.title}
                  </span>
                )}

                <BsPen
                  className="fs-4 mt-2 pointer"
                  onClick={makeInputActive}
                />
              </div>
              <button
                style={{ fontSize: "18px" }}
                className="btn btn-custom btn-blue text-white py-3 px-4 fw-bold rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#createModal"
              >
                <AiOutlinePlus /> Tambah
              </button>
            </div>
            {activity.data?.todo_items?.length ? (
              <TodoList
                todo={activity.data?.todo_items}
                deleteTodo={deleteTodo}
                finishTodo={finishTodo}
              />
            ) : (
              <div
                data-bs-toggle="modal"
                data-bs-target="#createModal"
                className="mt-4 pointer text-center"
              >
                <img src={EmptyItem} alt="Empty Item" />
              </div>
            )}
          </>
        )}
      </div>

      <CreateModal item={activity} createAction={createTodo} />
      <AlertModal text={"Todo berhasil dihapus"} />
    </>
  );
}
