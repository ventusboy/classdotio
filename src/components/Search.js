import React from "react";

function Search (props) {

    return (
        <input
            className="col-7 form-control"
            placeholder="Search"
            name="search"
            id="search"
            onChange={props.search}
        ></input>
    );
}

export default Search