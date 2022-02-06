import React from "react";

function Singlecard (props) {

    /*constructor(props) {
        super(props);
        console.log(this.props.data);
        this.state = this.props.data;
        this.onDelete = this.onDelete.bind(this);
    } */

    function onDelete() {
        console.log('item');
        props.delete(this.props.data);
    }

    console.log(props.data.name);
    let { data } = props;

    return (
        <div id={data.area + '-' + data.code} className={preReqsMet(data) + ' classCard col-10 container offset-1'}>
            <div className="row">
                <h3 className="col-xl-4 col-sm-4">{data.area + ' ' + data.code}</h3>
                <h3 className="col-xl-7 col-sm-6">{data.name}</h3>
                <img className="col-xl-1 col-sm-2 deletebtn d-flex justify-content-end" src="./assets/delete.svg" onClick={() => { this.onDelete() }} />
            </div>
            <div className="row">
                <h4 className="col-8">pre-reqs: <PreReqList list={data.preReq} /> </h4>
                <h4 className="col-4">completed: {data.completed ? 'yes' : 'no'}</h4>
            </div>
            <div className="row">
                <p className="col-12">description: the course you need to learn all about {data.name}</p>
            </div>
        </div>
    );
}

function PreReqList(props) {
    return props.list.map((item) =>
        <button
            type="button"
            key={item.toString()}
            onClick={navigateTo}
            className="btn btn-secondary"
            value={item.replace(' ', '-')} 
        >
            {item} 
        </button>
    );
}

function navigateTo(obj) {
    let button = obj.target;

    let elmnt = document.getElementById(button.value);
    //console.log("#"+button.value);
    elmnt.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

function preReqsMet(info) {
    let pre = info.pre;
    //console.log(completedArray);
    //console.log(pre);
    if (info.completed) {
        info.color = 'blue';
        info.rank = '1';
        //console.log('blue');
        return 'blue';
    }
    else {
        // put back later
        /*for (var i = 0; i < pre.length; i++) {
            if (!completedArray.includes(pre[i])) {
                info.color = 'red';
                info.rank = '3';
                //console.log('red');
                return 'red';
            }
        }*/
        //info.rank='2';
        info.color = 'yellow';
        info.rank = '2'
        //console.log('yellow');
        return 'yellow';
    }
}

export default Singlecard