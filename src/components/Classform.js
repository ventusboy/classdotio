import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";

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
    dropdowndb: [1, 2, 3]
}

function Classform (props){
    const [name, setName] = useState('')
    const [classCode, setClassCode] = useState('')
    const [preReqs, setPreReqs] = useState('')
    const [completed, setCompleted] = useState('')
    const [valid, setValid] = useState(true)
    const [dropdowndb, setDropdowndb] = useState([])
    const [classCodeError, setClassCodeError] = useState('')
    const [nameError, setNameError] = useState('')
    
    const { user } = useAuth0();

     

    /*constructor(props) {
        super(props);
        formData = initstate;
        this.handleChange = this.handleChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.changeState = this.changeState.bind(this);

    }*/
    useEffect(() => {
        if (window.innerWidth > 576) {
            document.getElementById('formCollapse').classList.remove('collapse')
        }
    })

    function handleNameChange(event) {
        setName(event.target.value);
        if(!valid && event.target.value.length > 0) {
            setNameError('')
        }
    }


    function codeChange(event) {
        setClassCode(event.target.value);
        if(!valid && event.target.value.length > 0) {
            setClassCodeError('')
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validate()) {
            // this.props.newclass();
            props.submitNewClass({
                name,
                classCode,
                preReqs,
                completed,
                email: user.email
            })
        }
        setName('');
        setClassCode('');
        setPreReqs('');

    }
    function validate() {
        // setFormData({ nameError: '' });
        // setFormData({ classcodeError: '' });
        let fast = 1;

        if (!name) {
            
            setNameError("name cannot be empty")
            setValid(false);
            fast = 0;    
        }
        if (!classCode) {
            setClassCodeError("class code cannot be empty")
            setValid(false)
            fast = 0;

            //return false;
        }

        ////console.log('the final state is ' + formData.valid);

        if (fast === 1) {
            //this.setState({ valid: true });   
            return true;
        }
        else {
            //this.setState({valid: true});
            return false;
        }

    }
    function onFocus() {
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

    function onBlur() {
        document.querySelector(document).ready(() => {
            document.querySelector('.dropdown-container').addClass("hide");
            document.querySelector('#name').unbind("keyup");
        });

    }

    /*componentDidMount() {

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
    }*/

    return (
        <div className="col-11 col-sm-3">
            <form id="classform" className="card" onSubmit={handleSubmit} autoComplete="new-password" >
                <legend className="card-header justify-content-start d-flex p-6">
                    <span className="d-none d-sm-block">Add a new class here</span>
                    <button className="btn btn-primary d-sm-none" type="button" data-bs-toggle="collapse" data-bs-target="#formCollapse" aria-expanded="false" aria-controls="formCollapse">
                        New Class
                    </button>
                </legend>
                <div id="formCollapse" className="card-body collapse">
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" autoComplete="new-password"
                            className={nameError ? 'form-control incorrect' : 'form-control'} value={name}
                            onChange={handleNameChange} list="options"></input>

                        <div className="errorMsg">{valid ? '' : nameError}</div>
                        {name !== '' ? <Dropdown list={dropdowndb} type={"name"} /> : ''}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="classcode">Class Code</label>
                        <input type="text" id="classcode" className={classCodeError ? 'form-control incorrect' : 'form-control'}
                            value={classCode} onChange={codeChange}></input>

                        <div className="errorMsg">{valid ? '' : classCodeError}</div>
                    </div>


                    <div className="mb-2">
                        <label htmlFor="classcode">Completed:</label>
                        <input type="checkbox" name="complete" id="completed" className="" style={{ marginLeft: '20px' }}></input>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="preReqs">Pre-req(s):</label>
                        <input type="text" id="preReqs" className="form-control"></input>
                    </div>

                    <br></br>
                    <button type="submit" className="btn btn-primary" form="classform">submit</button>
                </div>

            </form>
        </div>


    );
}

function Dropdown(props) {
    let type = props.type;
    console.log(props)
    let filtereditems = props.list?.filter((item) => {

        //if(item.name.toLowerCase().includes(props.name.toLowerCase())){
        if (type == 'name')
            return item.name;
        else if (type == 'code')
            return item.area + ' ' + item.code;

        //}

    });

    // console.log(filtereditems);

    const items = filtereditems?.map((item) => {


        return <option value={item.name} />


    });
    console.log(items);
    if (items?.length !== 0) {
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