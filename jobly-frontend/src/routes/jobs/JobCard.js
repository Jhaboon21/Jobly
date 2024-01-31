import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

/** Show simple info about a job */
function JobCard({ id, title, salary, equity, companyName }) {
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateStatus() {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    async function handleApply(evt) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div className="JobCard card"> {applied}
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p>{companyName}</p>
            {salary && <div><small>Salary: {salary}</small></div>}
            {equity !== undefined && <div><small>Equity: {equity}</small></div>}
            <button
                className="btn btn-danger font-weight-bold text-uppercase float-right"
                onClick={handleApply}
                disabled={applied}
            >
              {applied ? "Applied" : "Apply"}
            </button>
          </div>
        </div>
    );
}

export default JobCard;