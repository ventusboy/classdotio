import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Classform from "../components/Classform"
import Classes from "../components/Classes"


function DashBoard(props) {
    return (
        <div className="container-fluid mt-3" >
            <div className="row justify-content-center justify-content-sm-evenly g-3">
                <Classform user={props.user}/>
                <Classes user={props.user} />
            </div>
        </div>
    )
}


export default DashBoard