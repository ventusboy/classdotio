import axios from "axios";
import React from "react";

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

class Classform extends React.Component {
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
        this.setState({ preReqs: '' });

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
        //document.querySelector(document).ready(()=>{
        document.querySelector('.dropdown-container').removeClass("hide");
        console.log(Date.now());
        document.querySelector("#name").keyup(function keymove(e) {

            if (e.which === 40) {
                console.log('yeet!');
            }
            //e.target.removeEventListener(e.type, keymove);
        });


        // });
    }

    onBlur() {
        document.querySelector(document).ready(() => {
            document.querySelector('.dropdown-container').addClass("hide");
            document.querySelector('#name').unbind("keyup");
        });

    }

    componentDidMount() {

        let reqHeader = new Headers();
        reqHeader.append('Accept', 'application/json');
        let initObject = {
            method: 'GET', headers: reqHeader,
        };
        // console.log(this.props)

        axios.post('/submit', {
            name: 'Bio 1',
            preReqs: [],
            code: '1001',
            area: 'BIO',
            description: 'intro to Bio 1',
            color: 'yellow',
            rank: 1,
            completed: false,
            email: this.props.user.email
        })
        .then((data) => {
            console.log(data)
        })

        fetch('/universaldb', initObject)
            .then((response) => {
                return response.json();
                //dropdowndb=response.json();
            })
            .then((data) => {
                //console.log(data);
                this.setState({ dropdowndb: data });
            })
            .catch((err) => {
                console.log("fetch request is broken");
                console.log(err);
            });
    }

    render() {



        return (
            <form id="classform" className=" col-11 col-sm-4" onSubmit={this.handleSubmit} autoComplete="new-password" >
                <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="name">name</label>
                    <br></br>

                    <input type="text" id="name" name={Date.now()} autoComplete="new-password"
                        className={this.state.nameError ? 'form-control incorrect' : 'form-control'} value={this.state.name}
                        onChange={this.handleChange} list="options" /*onFocus={this.onFocus} onBlur={this.onBlur}*/></input>

                    <div className="errorMsg">{this.state.valid ? '' : this.state.nameError}</div>
                    {this.state.name !== '' ? <Dropdown list={this.state.dropdowndb} type={"name"} /> : ''}
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
                    <label htmlFor="preReqs">prereq(s):</label>
                    <br></br>
                    <input type="text" id="preReqs" className="form-control"></input>
                </div>

                <br></br>
                <button type="submit" className="btn btn-primary" form="classform">submit</button>


            </form>


        );
    }
}

function Dropdown(props) {
    let type = props.type;

    let filtereditems = props.list.filter((item) => {

        //if(item.name.toLowerCase().includes(props.name.toLowerCase())){
        if (type == 'name')
            return item.name;
        else if (type == 'code')
            return item.area + ' ' + item.code;

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

export default Classform