import axios from "axios";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Search from "../components/Search"
import Singlecard from "./Singlecard";



function Classes(props) {
    const [userClasses, setUserClasses] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        console.log(props.user)
        axios.post('/getUserInfo',{ email: props.user.email }).then((userInfo) => {
            console.log(userInfo)
        })
    })
    return(
        <div className="col-11 col-sm-8">
            <div>
                <div className="card">
                    <div className="d-flex card-header align-items-center">
                        <h1 className="col-4">Classes</h1>
                        <div className="col-8">
                            <Search />
                        </div>
                    </div>
                    <div className="card-body container-fluid" style={{"minHeight": "300px"}}>
                        <div className="row">
                            {/*<Singlecard data={props.user} list={userClasses} searchtext={searchText} />*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Classes