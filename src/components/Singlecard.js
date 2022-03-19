import React from "react";

function Singlecard (props) {

    console.log(props.item?.name);
    let { item } = props;
    console.log(item)

    function onDelete() {
        props.removeClass(item);
    }

    return (
        <div id={item.area + '-' + item.code} className={preReqsMet(item) + ' classCard col-10 container offset-1'}>
            <div className="row">
                <h3 className="col-xl-4 col-sm-4">{item.area + ' ' + item.code}</h3>
                <h3 className="col-xl-7 col-sm-6">{item.name}</h3>
                <img className="col-xl-1 col-sm-2 deletebtn d-flex justify-content-end" src="./assets/delete.svg" onClick={() => { onDelete() }} />
            </div>
            <div className="row">
                <h4 className="col-8">pre-reqs: <PreReqList list={item.preReqs} /> </h4>
                <h4 className="col-4">completed: {item.completed ? 'yes' : 'no'}</h4>
            </div>
            <div className="row">
                <p className="col-12">description: the course where you learn all about {item.name}</p>
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
        >
            {`${item.area}-${item.code}`} 
        </button>
    );
}

function navigateTo(obj) {
    let button = obj.target;
    console.log(button.value)
    let elmnt = document.getElementById(button.value);
    console.log(elmnt);
    elmnt && elmnt.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

function preReqsMet(item) {
    let pre = item.pre;
    //console.log(completedArray);
    //console.log(pre);
    if (item.completed) {
        item.color = 'blue';
        item.rank = '1';
        //console.log('blue');
        return 'blue';
    }
    else {
        // put back later
        /*for (var i = 0; i < pre.length; i++) {
            if (!completedArray.includes(pre[i])) {
                item.color = 'red';
                item.rank = '3';
                //console.log('red');
                return 'red';
            }
        }*/
        //item.rank='2';
        item.color = 'yellow';
        item.rank = '2'
        //console.log('yellow');
        return 'yellow';
    }
}

export default Singlecard