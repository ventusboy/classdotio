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
    const [completed, setCompleted] = useState(false)
    const [valid, setValid] = useState(true)
    const [dropdowndb, setDropdowndb] = useState([])
    const [classCodeError, setClassCodeError] = useState('')
    const [nameError, setNameError] = useState('')
    
    const { user } = useAuth0();

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

    function formatPreReqs() {
        let items = document.getElementById('preReqs').value
        if (items.length > 6) {
            items = items.toUpperCase().replace(/\s+/g, '').split(",")
        } else {
            return []
        }
        items = items.map((item) => {
            try {
                let index = item.search(/\d/)
                let area = item.substring(0, index)
                let code = item.substring(index) 
                if (area.length !== 3 || code.length > 5) {
                    throw(Error('Prerequisite area or code is incorrect'))
                }
                return {
                    area,
                    code
                }
            } catch (error) {
                console.log(error)
                return {error}
            }
        })
        return items
    }

    function handleSubmit(event) {
        event.preventDefault();
        let preReqs = formatPreReqs()
        if (validate(preReqs)) {
            props.submitNewClass({
                name: name.toUpperCase(),
                classCode: classCode.toUpperCase(),
                preReqs,
                completed
            })
        }
        setName('');
        setClassCode('');
        document.getElementById('preReqs').value = ''

    }
    function validate(preReqs) {
        if (!name) {
            
            setNameError("Name cannot be empty")
            setValid(false);
        }
        if (!classCode) {
            setClassCodeError("Class code cannot be empty")
            setValid(false)
        }
        if (preReqs.length > 0) {
            preReqs.forEach((item) => {
                if (item.error)
                    setValid(false)
            })
        }
        
        return valid

    }
    function onFocus() {
        document.querySelector('.dropdown-container').removeClass("hide");
        document.querySelector("#name").keyup(function keymove(e) {

            if (e.which === 40) {
                console.log('yeet!');
            }
        });
    }

    function onBlur() {
        document.querySelector(document).ready(() => {
            document.querySelector('.dropdown-container').addClass("hide");
            document.querySelector('#name').unbind("keyup");
        });

    }

    return (
        <div className="col-11 col-sm-4 col-md-3">
            <form id="classform" className="card" onSubmit={handleSubmit} autoComplete="new-password" >
                <legend className="card-header justify-content-start d-flex p-6">
                    <span className="d-none d-sm-block">Add a new class here</span>
                    <button
                        className="btn btn-primary d-sm-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#formCollapse"
                        aria-expanded="false"
                        aria-controls="formCollapse"
                    >
                        New Class
                    </button>
                </legend>
                <div id="formCollapse" className="card-body collapse">
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            autoComplete="new-password"
                            className={nameError ? 'form-control incorrect' : 'form-control'}
                            value={name}
                            onChange={handleNameChange}
                            list="options"
                        ></input>

                        <div className="errorMsg">{valid ? '' : nameError}</div>
                        {name !== '' ? <Dropdown list={dropdowndb} type={"name"} /> : ''}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="classcode">Class Code</label>
                        <input
                            type="text"
                            id="classcode"
                            className={classCodeError ? 'form-control incorrect' : 'form-control'}
                            value={classCode}
                            onChange={codeChange}
                        ></input>

                        <div className="errorMsg">{valid ? '' : classCodeError}</div>
                    </div>


                    <div className="mb-2">
                        <label htmlFor="classcode">Completed:</label>
                        <input
                            type="checkbox"
                            name="complete"
                            id="completed"
                            className=""
                            style={{ marginLeft: '20px' }}
                            onClick={() => {
                                setCompleted(!completed)
                            }}
                        ></input>
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
    let filtereditems = props.list?.filter((item) => {
        if (type == 'name')
            return item.name;
        else if (type == 'code')
            return item.area + ' ' + item.code;
    });


    const items = filtereditems?.map((item) => {


        return <option value={item.name} />


    });
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