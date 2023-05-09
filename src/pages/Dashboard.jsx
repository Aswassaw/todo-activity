import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import Navbar from "../components/Navbar";
import EmptyActivity from "../images/empty-activity.png";
import ActivityList from "../components/ActivityList";
import AlertModal from "../components/AlertModal";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivities();

    document.title = `To Do List - Dashboard`;
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/activity-groups?email=${process.env.REACT_APP_EMAIL_ENV}`
      );

      setActivities(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createActivity = async () => {
    try {
      setIsLoading(true);

      await axios.post(`${process.env.REACT_APP_API_URL}/activity-groups`, {
        title: "New Activity",
        email: process.env.REACT_APP_EMAIL_ENV,
      });

      fetchActivities();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteActivity = async (id) => {
    try {
      setIsLoading(true);

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/activity-groups/${id}`
      );

      fetchActivities();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
            {isLoading ? (
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

        {isLoading ? (
          <div className="spinner-border mt-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            {Boolean(activities.length) ? (
              <ActivityList
                activities={activities}
                deleteActivity={deleteActivity}
              />
            ) : (
              <div
                data-cy="activity-empty-state"
                className="mt-4 pointer"
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
