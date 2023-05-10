import "moment/locale/id";
import React, { useState } from "react";
import moment from "moment/moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

export default function ActivityList({ activities, deleteActivity }) {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
      {activities.map((activity) => (
        <div
          data-cy={`activity-item`}
          key={activity.id}
          className="col"
        >
          <div className="card h-100 shadow border-0 p-2">
            <div className="card-body">
              <h5 className="card-title fw-bold" data-cy="activity-item-title">
                <Link to={`/detail/${activity.id}`}>{activity.title}</Link>
              </h5>
              <div className="card-text d-flex justify-content-between mt-10">
                <div>
                  <p data-cy="activity-item-date">
                    {moment(activity.created_at).format("D MMMM YYYY")}
                  </p>
                </div>
                <div
                  className="pointer"
                  onClick={() => setSelectedActivity(activity)}
                  data-cy="activity-item-delete-button"
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
        text="Apakah anda yakin menghapus activity"
        item={selectedActivity}
        deleteAction={deleteActivity}
      />
    </div>
  );
}
