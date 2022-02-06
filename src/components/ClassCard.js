// import { useAuth0 } from "../react-auth0-spa";
import axios from "axios";
import $ from 'jquery';
import React, { Fragment } from "react";
import '../style.css';
import Singlecard from "./Singlecard"
import Classform from "./Classform";
import Search from "./Search";




/*$(document).ready(function () {
    load();
    //// update(); 

});*/

//var classes = Array();

var completedArray = [];



function createClass(name, area, code, completed, preReqs) {
    var classvar = {
        name,
        code,
        area,
        completed,
        preReqs,
        color: (!completed) ? 'red' : 'blue',
        rank: code,
    };

    if (completed) {
        completedArray.push(area + ' ' + code);
    }

    return classvar;
}

function load() {

    //var xhr = new XMLHttpRequest();
    //xhr.open('GET', '/payload', true);
    let classes = [];

    console.log('loading');
    /*xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            //console.log('response is ' + xhr.responseText);
            classes = JSON.parse(xhr.responseText);
            console.log(classes);

            classes.forEach((item) => {
                if (typeof item.pre != 'string')
                    item.pre = item.pre;
                else
                    item.pre = JSON.parse(item.pre);

                if (item.completed) {
                    completedArray.push(item.area + ' ' + item.code);
                }
            });

            classes = classes.sort((a, b) => {
                return a.completed - b.completed;
            });

        }
    }
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();*/

    /*fetch('/payload', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.user)
    })*/
    axios.post('/payload', {
        body: JSON.stringify(this.state.user)
    })
        .then(response => response.json())
        .then((response) => {
            classes = response.result;
            console.log(classes);

            classes.forEach((item) => {
                if (typeof(item.preReqs) == 'string')
                    item.preReqs = JSON.parse(item.preReqs);

                if (item.completed) {
                    completedArray.push(item.area + ' ' + item.code);
                }
            });

            classes = classes.sort((a, b) => {
                return a.completed - b.completed;
            });

            //self.setState({ list: classes, oglist: classes });
        });

    //console.log(classes);
    return classes;
}




const initstate = {
    name: '',
    classcode: '',
    preReqs: '',
    nameError: '',
    classcodeError: '',
    prereqError: '',
    value: '',
    //valid: false
    valid: true,
    dropdowndb: []
}

//$('#classform #name').addEventListener("input", )






class Classcard extends React.Component {
    //const array = props.classes;
    //console.log(array);
    constructor(props) {
        super(props);
        this.state = {
            searchtext: '',
            //list: this.props.list,
            //oglist: this.props.list
            user: this.props.user,
            list: [],
            oglist: []

        }
        this.changeSearch = this.changeSearch.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.newclass = this.newclass.bind(this);
        this.duplicate = this.duplicate.bind(this);

    }

    componentDidMount() {

        let self = this;


        var xhr = new XMLHttpRequest();
        // xhr.open('POST', '/payload', true);
        let classes = [];

        console.log('loading');
        console.log(this.state.user);
        /*xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                //console.log('response is ' + xhr.responseText);
                classes = JSON.parse(xhr.responseText);
                console.log(classes);

                classes.forEach((item) => {
                    if (typeof item.pre != 'string')
                        item.pre = item.pre;
                    else
                        item.pre = JSON.parse(item.pre);

                    if (item.completed) {
                        completedArray.push(item.area + ' ' + item.code);
                    }
                });

                classes = classes.sort((a, b) => {
                    return a.completed - b.completed;
                });

                self.setState({ list: classes, oglist: classes });
            }
        }
        //xhr.setRequestHeader('Accept', 'application/json');
        //xhr.send({ user: this.state.user.email });
*/

        fetch('/payload', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        })
            .then(response => response.json())
            .then((response) => {
                classes = response.result;
                console.log(classes);

                classes.forEach((item) => {
                    if (typeof item.pre != 'string')
                        item.pre = item.pre;
                    else
                        item.pre = JSON.parse(item.pre);

                    if (item.completed) {
                        completedArray.push(item.area + ' ' + item.code);
                    }
                });

                classes = classes.sort((a, b) => {
                    return a.completed - b.completed;
                });

                self.setState({ list: classes, oglist: classes });
            });

    }


    onDelete(obj) {
        console.log('delete!');
        console.log(obj);
        //console.log(classes);
        const templist = this.state.oglist.filter((item) => {
            if (obj._id != item._id) {
                return item;
            }
            else {

                let xhr = new XMLHttpRequest();
                xhr.open('POST', '/delete', true);

                xhr.onreadystatechange = function () {
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        //console.log('response is ' + xhr.responseText);
                    }
                }
                //console.log(classes[classes.length - 1]);
                xhr.setRequestHeader("Content-type", "application/json");


                xhr.send(JSON.stringify(item));
            }
        });

        this.setState({ oglist: templist });
        this.setState({ list: templist });


    }

    newclass() {

        //console.log('valid!');
        //sendData();
        // this.state=initstate;
        ////console.log(this.state);

        let preReqs = [];
        let classes = Object.assign([], this.state.oglist);

        let name = $('#name').val().trim();

        let preclasscode = $('#classcode').val().trim(' ').replace(/\s/g, '');
        let classcode = preclasscode.substring(3, preclasscode.length);
        let area = preclasscode.substring(0, 3).toUpperCase();
        let completed = $('#completed').prop('checked');
        preReqs = $('#preReqs').val().toUpperCase().trim().split(',');

        preReqs = preReqs.map((str) => {
            str = str.replace(/\s/g, '');

            if (str.length % 7 != 0 || str.length == 0) {
                return null;
            }
            //console.log('str is'+str);
            return str.slice(0, 3) + ' ' + str.slice(3, str.length);
        });

        preReqs = preReqs.filter((e) => {
            return e
        });

        console.log(preReqs);

        let xhr = new XMLHttpRequest();

        let newitem = createClass(name, area, classcode, completed, preReqs);
        newitem.email = this.state.user.email;

        if (this.duplicate(newitem)) {
            xhr.open('POST', '/update', true);
            //console.log(newitem._id);
        }
        else {
            classes.push(newitem);
            this.setState({ oglist: classes });
            this.setState({ list: classes });
            xhr.open('POST', '/submit', true);
        }

        $('#name').val('');
        $('#classcode').val('');
        $('#completed').checked = false;
        $('#preReqs').val('');
        //update();




        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                //console.log('response is ' + xhr.responseText);
            }
        }
        //console.log(classes[classes.length - 1]);
        xhr.setRequestHeader("Content-type", "application/json");
        console.log(newitem);

        xhr.send(JSON.stringify(newitem), () => {
            this.setState({ oglist: load() });
            this.setState({ list: load() });
        });
    }

    duplicate(item) {
        var bool = false;
        // item._id=0;
        let templist = this.state.oglist.map((olditem) => {
            if (item.area == olditem.area && item.code == olditem.code) {
                //item._id=olditem._id;
                bool = true;
                return item;

            }
            else {
                return olditem
            }
        });
        this.setState({ oglist: templist });
        this.setState({ list: templist });

        return bool;
    }




    render() {
        return (
            <Fragment>
                <div className="row mainbody col-12">
                    <div className="col-3">
                        <div className="card ">
                            <div className="card-header">
                                <h1>Class Input</h1>
                            </div>
                            <div className="card-body">
                                <Classform newclass={this.newclass} list={this.state.oglist} />
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="card" style={{ height: '100%' }}>
                            <div className="d-flex card-header container align-items-center">
                                <h1 className="col-4 ">Classes</h1>
                                <Search changeSearch={this.changeSearch} searchtext={this.state.searchtext} />
                            </div>
                            <div className="card-body container-fluid" style={{ overflow: "scroll", overflowX: "hidden" }}>
                                <div className="row">
                                    <Truecard list={this.state.list} searchtext={this.state.searchtext} delete={this.onDelete} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

class Truecard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //list: this.props.list
        };
        console.log(this.props.list);
        this.removeClass = this.removeClass.bind(this);
    }

    removeClass(obj) {
        this.props.delete(obj);

    }


    render() {

        let filteredItems = (this.props.list ? this.props.list : []).map((item) => {
            console.log('loading ' + item.name);
            return <Singlecard key={item.area.toString() + item.code.toString()} delete={this.removeClass} data={item} />

        });


        return filteredItems;
    }
}

export default Classcard;