import React from "react";
import JobCard from "./JobCard";

/** Show a list of jobs with simple info */
function JobCardList({ jobs, apply}) {
    return (
        <div className="JobCardList">
            {jobs.map(job => (
                <JobCard 
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}
        </div>
    )
}

export default JobCardList;