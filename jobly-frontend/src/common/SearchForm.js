import React, { useState } from "react";

// Search form to filter for the companyList/jobList
function SearchForm({ searchFor }) {
    const [searchString, setSearchString] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        // remove whitespace characters in case user tries to accidentally search for it
        searchFor(searchString.trim() || undefined);
        setSearchString(searchString.trim());
    }

    function handleChange(e) {
        setSearchString(e.target.value);
    }

    return (
      <div className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
              className="form-control form-control-lg flex-grow-1"
              name="searchTerm"
              placeholder="Enter search term.."
              value={searchString}
              onChange={handleChange}
          />
          <button type="submit" className="btn btn-lg btn-primary">
            Submit
          </button>
        </form>
      </div>
    )
}

export default SearchForm;