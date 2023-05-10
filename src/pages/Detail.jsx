/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { BiSortAZ, BiSortAlt2, BiSortZA } from "react-icons/bi";
import { BsPencilSquare, BsSortDown, BsSortUpAlt } from "react-icons/bs";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import EmptyItem from "../images/empty-item.png";
import CreateModal from "../components/CreateModal";
import AlertModal from "../components/AlertModal";

export default function Detail() {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [queryParams] = useSearchParams();
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
    if (!activity.isLoading) {
      let activityCopy = { ...activity };

      if (queryParams.get("sort") === "old") {
        activityCopy.data.todo_items = _.reverse(activityCopy.data.todo_items);
        setActivity(activityCopy);
      } else if (queryParams.get("sort") === "az") {
        activityCopy.data.todo_items = _.sortBy(activityCopy.data.todo_items, [
          "title",
        ]);
        setActivity(activityCopy);
      } else if (queryParams.get("sort") === "za") {
        activityCopy.data.todo_items = _.orderBy(
          activityCopy.data.todo_items,
          ["title"],
          ["desc"]
        );
        setActivity(activityCopy);
      } else if (queryParams.get("sort") === "unfinished") {
        const finishedTodo = activityCopy.data.todo_items.filter(
          (todo) => todo.is_active === 0
        );
        const unFinishedTodo = activityCopy.data.todo_items.filter(
          (todo) => todo.is_active === 1
        );
        activityCopy.data.todo_items = [...unFinishedTodo, ...finishedTodo];
        setActivity(activityCopy);
      } else {
        fetchActivity();
      }
    }
  }, [queryParams]);

  useEffect(() => {
    const input = document.getElementById("activityInput");
    if (input) input.focus();
  }, [inputActive]);

  const fetchActivity = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/activity-groups/${urlParams.id}?email=${process.env.REACT_APP_EMAIL_ENV}`
      );

      if (queryParams.get("sort") === "old") {
        res.data.todo_items = _.reverse(res.data.todo_items);
      } else if (queryParams.get("sort") === "az") {
        res.data.todo_items = _.sortBy(res.data.todo_items, ["title"]);
      } else if (queryParams.get("sort") === "za") {
        res.data.todo_items = _.orderBy(
          res.data.todo_items,
          ["title"],
          ["desc"]
        );
      } else if (queryParams.get("sort") === "unfinished") {
        const finishedTodo = res.data.todo_items.filter(
          (todo) => todo.is_active === 0
        );
        const unFinishedTodo = res.data.todo_items.filter(
          (todo) => todo.is_active === 1
        );
        res.data.todo_items = [...unFinishedTodo, ...finishedTodo];
      }

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

  const editTodo = async (id, val) => {
    try {
      setActivity({
        ...activity,
        isLoading: true,
      });

      await axios.patch(`${process.env.REACT_APP_API_URL}/todo-items/${id}`, {
        title: val.listItemName,
        priority: val.priority,
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
                <Link data-cy="todo-back-button" className="fs-2" to={"/"}>
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
                  <span
                    data-cy="todo-title"
                    className="mx-3 fw-bold fs-1"
                    onClick={makeInputActive}
                  >
                    {activity.data?.title}
                  </span>
                )}

                <BsPencilSquare
                  data-cy="todo-title-edit-button"
                  className="fs-4 mt-2 pointer"
                  onClick={makeInputActive}
                />
              </div>
              <div>
                <div className="btn-group me-3">
                  <button
                    data-cy="todo-sort-button"
                    type="button"
                    className="btn btn-lg border fs-4 text-secondary rounded-circle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <BiSortAlt2 />
                  </button>
                  <ul
                    className="dropdown-menu"
                    style={{ width: "230px" }}
                  >
                    <li data-cy={`sort-selection`}>
                      <Link
                        to={`/detail/${urlParams.id}`}
                        className="dropdown-item pb-2 px-4"
                        href="#"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <span className="fs-5 text-blue me-2">
                              <BsSortDown />
                            </span>{" "}
                            Terbaru
                          </span>
                          <span className="mt-1">
                            {queryParams.get("sort") === null && (
                              <AiOutlineCheck />
                            )}
                          </span>
                        </div>
                      </Link>
                      <hr className="p-0 m-0" />
                    </li>
                    <li data-cy={`sort-selection`}>
                      <Link
                        to={`/detail/${urlParams.id}?sort=old`}
                        className="dropdown-item py-2 px-4"
                        href="#"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <span className="fs-5 text-blue me-2">
                              <BsSortUpAlt />
                            </span>{" "}
                            Terlama
                          </span>
                          <span className="mt-1">
                            {queryParams.get("sort") === "old" && (
                              <AiOutlineCheck />
                            )}
                          </span>
                        </div>
                      </Link>
                      <hr className="p-0 m-0" />
                    </li>
                    <li data-cy={`sort-selection`}>
                      <Link
                        to={`/detail/${urlParams.id}?sort=az`}
                        className="dropdown-item py-2 px-4"
                        href="#"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <span className="fs-5 text-blue me-2">
                              <BiSortAZ />
                            </span>{" "}
                            A-Z
                          </span>
                          <span className="mt-1">
                            {queryParams.get("sort") === "az" && (
                              <AiOutlineCheck />
                            )}
                          </span>
                        </div>
                      </Link>
                      <hr className="p-0 m-0" />
                    </li>
                    <li data-cy={`sort-selection`}>
                      <Link
                        to={`/detail/${urlParams.id}?sort=za`}
                        className="dropdown-item py-2 px-4"
                        href="#"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <span className="fs-5 text-blue me-2">
                              <BiSortZA />
                            </span>{" "}
                            Z-A
                          </span>
                          <span className="mt-1">
                            {queryParams.get("sort") === "za" && (
                              <AiOutlineCheck />
                            )}
                          </span>
                        </div>
                      </Link>
                      <hr className="p-0 m-0" />
                    </li>
                    <li data-cy={`sort-selection`}>
                      <Link
                        to={`/detail/${urlParams.id}?sort=unfinished`}
                        className="dropdown-item pt-2 px-4"
                        href="#"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span>
                            <span className="fs-5 text-blue me-2">
                              <BiSortAlt2 />
                            </span>{" "}
                            Belum Selesai
                          </span>
                          <span className="mt-1">
                            {queryParams.get("sort") === "unfinished" && (
                              <AiOutlineCheck />
                            )}
                          </span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <button
                  data-cy="todo-add-button"
                  style={{ fontSize: "18px" }}
                  className="btn btn-custom btn-blue text-white py-3 px-4 fw-bold rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-target="#createModal"
                >
                  <AiOutlinePlus /> Tambah
                </button>
              </div>
            </div>
            {activity.data?.todo_items?.length ? (
              <TodoList
                activity={activity.isLoading}
                todo={activity.data?.todo_items}
                deleteTodo={deleteTodo}
                finishTodo={finishTodo}
                editTodo={editTodo}
              />
            ) : (
              <div
                data-cy="todo-empty-state"
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

      <CreateModal loading={activity.isLoading} createAction={createTodo} />
      <AlertModal text={"Todo berhasil dihapus"} />
    </>
  );
}
