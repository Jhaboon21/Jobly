import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../../common/LoadingSpinner";

/** Show detailed information about a company
 * 
 * routed at /companies/:handle
 */
function CompanyDetail() {
    const {handle} = useParams();
    const [company, setCompany] = useState(null);

    useEffect(function getCompanyAndJobs() {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        }
        getCompany();
    }, [handle]);

    // while waiting for company results to load, display loadin spinner
    if (!company) return <LoadingSpinner />;

    return (
        <div className="CompanyDetail">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    )
}

export default CompanyDetail;