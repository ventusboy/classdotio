import React, { useState } from "react";
import Search from "../components/Search"
import Singlecard from "./Singlecard";



function Classes(props) {
    const [searchText, setSearchText] = useState('')

    function search (event) {
        setSearchText(event.target.value)
    }

    return(
        <div id="classes" className="col-12 col-md-8 d-flex flex-grow-1">
            <div className="card d-flex flex-grow-1">
                <div className="d-flex card-header align-items-center">
                    <h1 className="col-4">Classes</h1>
                    <div className="col-8">
                        <Search search={search}/>
                    </div>
                </div>
                <div id="class-holder" className="card-body container-fluid">
                    <div className="row">
                        <ClassList
                            classes={props.classes}
                            removeClass={props.removeClass}
                            searchText={searchText}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ClassList(props) {
    let classes = props.classes || [] 
    let searchText = props.searchText.toLocaleLowerCase()
    classes = classes.sort((a, b) => {
        if (b.area === a.area){
            return a.code.substring(0,4) - b.code.substring(0,4)
        }
        return b.area - a.area
    })
    if (searchText.trim().length > 0){
        classes = classes.filter((item) => {
            return Object.values(item).toString().toLocaleLowerCase().includes(searchText)
        })
    }

    classes = classes.map((item) => {
        return <Singlecard key={item.area + item.code} removeClass={props.removeClass} item={item} />
    });

    return classes;
}


export default Classes