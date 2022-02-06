import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Classform from "../components/Classform"
import Classes from "../components/Classes"


function DashBoard(props) {
    return (
        <div>
            <Classform />
            <Classes user={props.user} />
        </div>
    )
}


export default DashBoard