import axios from "axios";
import { data } from "jquery";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Search from "../components/Search"
import Singlecard from "./Singlecard";



function Classes(props) {
    const [searchText, setSearchText] = useState('')

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
                    <div id="class-holder" className="card-body container-fluid">
                        <div className="row">
                            <ClassList classes={props.classes} removeClass={props.removeClass} />
                            {/*<Singlecard data={props.user} list={userClasses} searchtext={searchText} />*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ClassList(props) {
    let classes = props.classes || [] 
    classes = classes.sort((a, b) => {
        if (b.area === a.area){
            return a.code.substring(0,4) - b.code.substring(0,4)
        }
        return b.area - a.area
    })
    let filteredItems = classes.map((item) => {
        console.log('loading ' + item.name);
        return <Singlecard key={item.area + item.code} removeClass={props.removeClass} item={item} />
    });


    return filteredItems;
    
}


export default Classes