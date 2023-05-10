import "moment/locale/id";
import React, { useState } from "react";
import moment from "moment/moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

export default function ActivityList({ activities, deleteActivity }) {
  const navigate = useNavigate();
  const [deleteModal, showDeleteModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
        {activities.map((activity) => (
          <div data-cy={`activity-item`} key={activity.id} className="col">
            <div className="card h-100 shadow border-0 p-2">
              <div
                className="card-body pointer"
                style={{ height: "180px" }}
                onClick={() => navigate(`/detail/${activity.id}`)}
              >
                <h5
                  className="card-title fw-bold"
                  data-cy="activity-item-title"
                >
                  <p to={`/detail/${activity.id}`}>{activity.title}</p>
                </h5>
              </div>
              <div className="card-footer card-text d-flex justify-content-between">
                <div>
                  <p data-cy="activity-item-date">
                    {moment(activity.created_at).format("D MMMM YYYY")}
                  </p>
                </div>
                <div
                  className="pointer"
                  onClick={() => {
                    setSelectedActivity(activity);
                    showDeleteModal(!deleteModal);
                  }}
                  data-cy="activity-item-delete-button"
                >
                  <RiDeleteBin6Line className="fs-5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        deleteModal={deleteModal}
        showDeleteModal={showDeleteModal}
        text="Apakah anda yakin menghapus activity"
        item={selectedActivity}
        deleteAction={deleteActivity}
      />
    </>
  );
}
