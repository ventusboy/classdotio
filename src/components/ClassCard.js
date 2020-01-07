import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

import '../style.css';
import $ from 'jquery';



/*$(document).ready(function () {
    load();
    //// update(); 

});*/

//var classes = Array();

var completedArray = [];



function createclass(name, area, code, completed, prereqs) {
    var classvar = {
        name: name,
        code: code,
        area: area,
        completed: completed,
        pre: prereqs,
        color: (!completed) ? 'red' : 'blue',
        rank: code,
    };

    if (completed) {
        completedArray.push(area + ' ' + code);
    }

    return classvar;
}

function load() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/payload', true);
    let classes = [];

    console.log('loading');
    xhr.onreadystatechange = function () {
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
    xhr.send();
    //console.log(classes);
    return classes;
}




const initstate = {
    name: '',
    classcode: '',
    prereqs: '',
    nameError: '',
    classcodeError: '',
    prereqError: '',
    value: '',
    //valid: false
    valid: true,
    dropdowndb: []
}

//$('#classform #name').addEventListener("input", )

class Iform extends React.Component {
    constructor(props) {
        super(props);
        this.state = initstate;
        this.handleChange = this.handleChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.changeState = this.changeState.bind(this);

    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        });


    }

    changeState(obj) {

    }

    codeChange(event) {
        this.setState({
            classcode: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
            this.props.newclass();
        }
        this.setState({ name: '' });
        this.setState({ classcode: '' });
        this.setState({ prereqs: '' });

    }

    validate() {
        this.setState({ nameError: '' });
        this.setState({ classcodeError: '' });
        let fast = 1;

        //console.log('no way 2');
        if (!this.state.name) {
            this.setState({ nameError: "name cannot be empty" });
            ////console.log('no way!');
            this.setState({ valid: false });
            fast = 0;

            // return false;
        }
        if (!this.state.classcode) {
            this.setState({ classcodeError: "class code cannot be empty" });
            this.setState({ valid: false });
            fast = 0;

            //return false;
        }

        ////console.log('the final state is ' + this.state.valid);

        if (fast === 1) {
            //this.setState({ valid: true });   
            return true;
        }
        else {
            //this.setState({valid: true});
            return false;
        }

    }

    onFocus() {
        //
        //$(document).ready(()=>{
        $('.dropdown-container').removeClass("hide");
        console.log(Date.now());
        $("#name").keyup(function keymove(e) {

            if (e.which === 40) {
                console.log('yeet!');
            }
            //e.target.removeEventListener(e.type, keymove);
        });


        // });
    }

    onBlur() {
        $(document).ready(() => {
            $('.dropdown-container').addClass("hide");
            $('#name').unbind("keyup");
        });

    }

    componentDidMount(){
        
        let reqHeader = new Headers();
        reqHeader.append('Accept', 'application/json');
        let initObject = {
            method: 'GET', headers: reqHeader,
        };

        fetch('/universaldb',initObject)
        .then((response)=>{
            return response.json();
            //dropdowndb=response.json();
        })
        .then((data)=>{
            //console.log(data);
            this.setState({dropdowndb: data});
        })
        .catch((err)=>{
            console.log("fetch request is broken");
            console.log(err);
        });
    }

    render() {



        return (
            <form id="classform" className="" onSubmit={this.handleSubmit} autoComplete="new-password" >
                <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="name">name</label>
                    <br></br>

                    <input type="text" id="name" name={Date.now()} autoComplete="new-password"
                        className={this.state.nameError ? 'form-control incorrect' : 'form-control'} value={this.state.name}
                        onChange={this.handleChange} list="options" /*onFocus={this.onFocus} onBlur={this.onBlur}*/></input>

                    <div className="errorMsg">{this.state.valid ? '' : this.state.nameError}</div>
                    {$('#name').val()!==''? <Dropdown list={this.state.dropdowndb}/>:''}
                </div>
                <div className="form-group">
                    <label htmlFor="classcode">code</label>
                    <br></br>

                    <input type="text" id="classcode" className={this.state.classcodeError ? 'incorrect' : 'form-control'}
                        value={this.state.classcode} onChange={this.codeChange}></input>

                    <div className="errorMsg">{this.state.valid ? '' : this.state.classcodeError}</div>
                </div>


                <div className="form-group">
                    <label htmlFor="classcode">completed:</label>
                    <input type="checkbox" name="complete" id="completed" className="" style={{ marginLeft: '20px' }}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="prereqs">prereq(s):</label>
                    <br></br>
                    <input type="text" id="prereqs" className="form-control"></input>
                </div>

                <br></br>
                <button type="submit" className="btn btn-primary" form="classform">submit</button>


            </form>


        );
    }
}

function Dropdown(props) {


    let filtereditems = props.list.filter((item) => {

        //if(item.name.toLowerCase().includes(props.name.toLowerCase())){
        return item.name;
        //}

    });

    // console.log(filtereditems);

    const items = filtereditems.map((item) => {


        return <option value={item.name} />


    });
    console.log(items);
    if (items.length !== 0) {
        return (
            <datalist id="options">
                {items}
            </datalist>
        );
    }
    else {
        return '';
    }

}

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.search = this.search.bind(this);
        //this.process=this.process.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    search(event) {
        this.props.changeSearch(event.target.value);
    }

    onKeyDown(e) {
        if (e.keyCode === 8 || e.key === 'Backspace') {
            console.log('deleted');
        }
    }

    render() {
        const bar = (
            <input
                className="col-7 form-control"
                placeholder="Search"
                name="search"
                id="search"
                onChange={this.search}
                value={this.props.searchtext}
                onKeyDown={this.onKeyDown}
            ></input>
        );
        return bar;
    }
}


class Classcard extends React.Component {
    //const array = props.classes;
    //console.log(array);
    constructor(props) {
        super(props);
        this.state = {
            searchtext: '',
            //list: this.props.list,
            //oglist: this.props.list
            list: [],
            oglist: []

        }
        this.changeSearch = this.changeSearch.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.newclass = this.newclass.bind(this);
        this.duplicate = this.duplicate.bind(this);

    }

    componentDidMount() {

        let self=this;


        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/payload', true);
        let classes = [];

        console.log('loading');
        xhr.onreadystatechange = function () {
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

                self.setState({list: classes, oglist: classes});
            }
        }
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();

    }


    changeSearch(value) {
        this.setState({ searchtext: value });
        var items;

        if (value !== '') {

            this.setState({
                list: this.state.oglist.filter((item) => {

                    if (Object.values(item).toString().toLowerCase().includes(value.toLowerCase())) {
                        console.log(Object.values(item));
                        return item;
                    }

                })
            });
        }
        else {
            this.setState({ list: this.state.oglist });
        }
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

        let prereqs = [];
        let classes = Object.assign([], this.state.oglist);

        let name = $('#name').val().trim();

        let preclasscode = $('#classcode').val().trim(' ').replace(/\s/g, '');
        let classcode = preclasscode.substring(3, preclasscode.length);
        let area = preclasscode.substring(0, 3).toUpperCase();
        let completed = $('#completed').prop('checked');
        prereqs = $('#prereqs').val().toUpperCase().trim().split(',');

        prereqs = prereqs.map((str) => {
            str = str.replace(/\s/g, '');

            if (str.length % 7 != 0 || str.length == 0) {
                return null;
            }
            //console.log('str is'+str);
            return str.slice(0, 3) + ' ' + str.slice(3, str.length);
        });

        prereqs = prereqs.filter((e) => {
            return e
        });

        console.log(prereqs);

        let xhr = new XMLHttpRequest();

        let newitem = createclass(name, area, classcode, completed, prereqs);

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
        $('#prereqs').val('');
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
                            <Iform newclass={this.newclass} list={this.state.oglist} />
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="card" style={{ height: '90vh' }}>
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
            return <Singlecard key={item.area.toString() + item.code.toString()} delete={this.removeClass} item2={item} />

        });


        return filteredItems;
    }
}

class Singlecard extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.item2);
        this.state = this.props.item2;
        this.onDelete = this.onDelete.bind(this);


    }

    onDelete() {
        console.log('item');
        //this.setState()
        this.props.delete(this.props.item2);
    }

    render() {
        console.log(this.props.item2.name);
        var obj = this.props.item2;

        return (
            <div id={obj.area + '-' + obj.code} className={preReqsMet(obj) + ' classCard col-10 container offset-1'}>
                <div className="row">
                    <h3 className="col-xl-4 col-sm-4">{obj.area + ' ' + obj.code}</h3>
                    <h3 className="col-xl-7 col-sm-6">{obj.name}</h3>
                    <img className="col-xl-1 col-sm-2 deletebtn d-flex justify-content-end" src="./assets/delete.svg" onClick={() => { this.onDelete() }} />
                </div>
                <div className="row">
                    <h4 className="col-8">pre-reqs: <PreReqList pre={obj.pre} /> </h4>
                    <h4 className="col-4">completed: {obj.completed ? 'yes' : 'no'}</h4>
                </div>
                <div className="row">
                    <p className="col-12">description: the course you need to learn all about {obj.name}</p>
                </div>
            </div>
        );
    }
}

function PreReqList(props) {
    //let preReqListParse=JSON.parse(props.pre)


    let preReqListParse = props.pre;
    //console.log(preReqListParse);





    const prereqs = preReqListParse.map((item) =>

        <button type="button" key={item.toString()} onClick={navigateTo} className="btn btn-secondary" style={{ marginRight: "3px" }} value={item.replace(' ', '-')} >{item} </button>
    );
    return prereqs;
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

        for (var i = 0; i < pre.length; i++) {
            if (!completedArray.includes(pre[i])) {
                info.color = 'red';
                info.rank = '3';
                //console.log('red');
                return 'red';
            }
        }
        //info.rank='2';
        info.color = 'yellow';
        info.rank = '2'
        //console.log('yellow');
        return 'yellow';
    }


}


export default Classcard;