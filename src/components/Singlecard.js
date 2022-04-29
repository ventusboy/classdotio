import React from "react";

import { useContext, useEffect, useState } from "react";
import { ClassesContext } from "pages/DashBoard";

function Singlecard (props) {
    let classes = useContext(ClassesContext)
    let [status, setStatus] = useState('yellow')
    let { item } = props;

    function onDelete() {
        props.removeClass(item);
    }

    useEffect(() => {
        if (item.completed) {
            setStatus('blue')
            return
        }
        else {
            for (let i = 0; i < item.preReqs.length; i++) {
                let { area, code } = item.preReqs[i]
                if (classes?.includes(area + code)) {
                    continue                 
                } else if (i === item.preReqs.length - 1) {
                    setStatus('red')
                    return
                }
            }
            setStatus('yellow')
            return
        }
    },[classes,item])

    return (
        <div id={item.area + '-' + item.code} className={status + ' classCard col-10 container offset-1'}>
            <div className="row">
                <div className="col-10 d-flex flex-column">
                    <h3 className="col-xl-4 col-sm-4">{item.area + ' ' + item.code}</h3>
                    <h4 className="col-xl-7 col-sm-6 text-capitalize">{item.name}</h4>
                </div>
                <div className="col-2 col-xl-1 col-sm-2 d-flex justify-content-end">
                    <img className="deletebtn" src="./assets/delete.svg" onClick={() => { onDelete() }}  alt="Delete Icon"  />
                </div>
            </div>
            <div className="row">
                <p className="col-12 text-capitalize">Description: the course where you learn all about {item.name}</p>
            </div>
            <div className="row">
                <h5 className="col-12 col-md-8">Pre-Reqs: <PreReqList list={item.preReqs} /> </h5>
                <h6 className="col-12 col-md-4">Completed: {item.completed ? 'Yes' : 'No'}</h6>
            </div>
        </div>
    );
}

function PreReqList(props) {
    if (!Array.isArray(props.list)) {
        return (<div></div>)
    }
    return props.list.map((item) =>
        <button
            type="button"
            key={`${item.area}-${item.code}`.toString()}
            onClick={navigateTo}
            className="btn btn-secondary"
            value={`${item.area}-${item.code}`} 
            style={{ margin: "2px 3px"}}
        >
            {`${item.area}-${item.code}`} 
        </button>
    );
}

function navigateTo(obj) {
    let button = obj.target;
    let elmnt = document.getElementById(button.value);
    elmnt && elmnt.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    button.blur()
}

export default Singlecard