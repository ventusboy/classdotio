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
        <div>
            <div className="col-7">
                <div className="card" style={{ height: '100%' }}>
                    <div className="d-flex card-header container align-items-center">
                        <h1 className="col-4 ">Classes</h1>
                        <Search />
                    </div>
                    <div className="card-body container-fluid" style={{ overflow: "scroll", overflowX: "hidden" }}>
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