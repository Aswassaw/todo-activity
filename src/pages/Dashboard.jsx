import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import Navbar from "../components/Navbar";
import ActivityList from "../components/ActivityList";
import AlertModal from "../components/AlertModal";
import EmptyActivity from "../images/empty-activity.png";

export default function Dashboard() {
  const [activities, setActivities] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    fetchActivities();

    document.title = `To Do List - Dashboard`;
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/activity-groups?email=${process.env.REACT_APP_EMAIL_ENV}`
      );

      setActivities({
        data: res.data.data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);

      setActivities({
        ...activities,
        isLoading: false,
      });
    }
  };

  const createActivity = async () => {
    try {
      setActivities({
        ...activities,
        isLoading: true,
      });

      await axios.post(`${process.env.REACT_APP_API_URL}/activity-groups`, {
        title: "New Activity",
        email: process.env.REACT_APP_EMAIL_ENV,
      });

      fetchActivities();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const deleteActivity = async (id) => {
    try {
      setActivities({
        ...activities,
        isLoading: true,
      });

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/activity-groups/${id}`
      );

      fetchActivities();
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      document.getElementById("showAlertModal").click();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container w-primary my-4">
        <div className="d-flex justify-content-between">
          <div>
            <h1 data-cy="activity-title" className="fw-bold">
              Activity
            </h1>
          </div>
          <div>
            {activities.isLoading ? (
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
                data-cy="activity-add-button"
                style={{ fontSize: "18px" }}
                className="btn btn-custom btn-blue text-white py-3 px-4 fw-bold rounded-pill"
                onClick={() => createActivity()}
              >
                <AiOutlinePlus /> Tambah
              </button>
            )}
          </div>
        </div>

        {activities.isLoading ? (
          <div className="spinner-border mt-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            {Boolean(activities.data.length) ? (
              <ActivityList
                activities={activities.data}
                deleteActivity={deleteActivity}
              />
            ) : (
              <div
                data-cy="activity-empty-state"
                className="mt-4 pointer text-center"
                onClick={() => createActivity()}
              >
                <img src={EmptyActivity} alt="Empty Activity" />
              </div>
            )}
          </>
        )}
      </div>

      <AlertModal text={"Activity berhasil dihapus"} />
    </>
  );
}
