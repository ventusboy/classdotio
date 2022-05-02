import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

function Classform(props) {
    const [name, setName] = useState('')
    const [classCode, setClassCode] = useState('')
    const [completed, setCompleted] = useState(false)
    const [valid, setValid] = useState(true)
    const [dropdowndb, setDropdowndb] = useState([])
    const [classCodeError, setClassCodeError] = useState('')
    const [nameError, setNameError] = useState('')
    const [open, setOpen] = useState(false);

    window.addEventListener('resize', () => {
        if (window.innerWidth > 576) {
            setOpen(true)
        }
    })

    function handleNameChange(event) {
        setName(event.target.value);
        if (!valid && event.target.value.length > 0) {
            setNameError('')
        }
    }


    function codeChange(event) {
        setClassCode(event.target.value);
        if (!valid && event.target.value.length > 0) {
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
                    throw (Error('Prerequisite area or code is incorrect'))
                }
                return {
                    area,
                    code
                }
            } catch (error) {
                console.log(error)
                return { error }
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

    return (
        <div className="col-12 col-md-3">
            <form id="classform" className="card" onSubmit={handleSubmit} autoComplete="new-password" >
                <legend className="card-header justify-content-start d-flex p-6">
                    <span className="d-none d-md-block">Add a new class here</span>
                    <Button
                        className="btn btn-primary d-md-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#formCollapse"
                        aria-expanded="false"
                        aria-controls="formCollapse"
                        onClick={() => {
                            console.log('opening')
                            setOpen(!open)}
                        }
                    >
                        New Class
                    </Button>
                </legend>
                <Collapse in={open || window.innerWidth >= 576}>
                    <div className="">
                        <div id="formCollapse" className="card-body">
                            <div className="mb-2">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    autoComplete="new-password"
                                    className={nameError ? 'form-control incorrect' : 'form-control'}
                                    value={name}
                                    onChange={handleNameChange}
                                ></input>

                                <div className="errorMsg">{valid ? '' : nameError}</div>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="classcode">Class Code</label>
                                <input
                                    type="text"
                                    id="classcode"
                                    className={classCodeError ? 'form-control incorrect' : 'form-control'}
                                    value={classCode}
                                    onChange={codeChange}
                                    list="options"
                                ></input>

                                <div className="errorMsg">{valid ? '' : classCodeError}</div>
                                {classCode !== '' ? <
                                    Dropdown classes={props.classes} type={"code"} /> : ''}
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
                        </div>
                </Collapse>

            </form>
        </div>


    );
}

function Dropdown({ classes }) {
    console.log(classes)
    let filteredItems = classes?.map((item) => {
        return <option key={item.area + item.code} value={item.area + ' ' + item.code} />;
    });
    console.log(filteredItems)

    if (filteredItems?.length !== 0) {
        return (
            <datalist id="options">
                {filteredItems}
            </datalist>
        );
    } else {
        return '';
    }

}

export default Classform