import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import Classform from "../components/Classform"
import Classes from "../components/Classes"


function DashBoard(props) {
    const [userClasses, setUserClasses] = useState([])
    const [changes, setChanges] = useState(0)
    let classes = []
    axios.defaults.headers.common['sub'] = props.user.sub;

    
    useEffect(() => {
        async function getClasses () {
            let { data } = await axios.post('/getUserInfo', { email: props.user.email })
            classes = data
            // console.log(data)
            // classCount = classes.length
            setUserClasses(classes)
        }
        getClasses()
        // classes = getClasses()
    },[changes])

    async function submitNewClass (classInfo) {
        try {
            await axios.post('/submit', classInfo)
            setUserClasses([...userClasses, classInfo])
            setChanges(changes + 1)
        } catch (error) {
            console.log(error)
        }
        return
    }

    async function removeClass(obj) {
        // this.props.delete(obj);
        setUserClasses(userClasses.filter(item => item.area + item.code !== obj.area +obj.code))
        await axios.post('/delete', obj)
        setChanges(changes + 1)
    }

    return (
        <div id="dashboard" className="d-flex flex-grow-1 container-fluid mt-3" >
            <div className="row flex-grow-1 justify-content-center justify-content-sm-evenly g-3">
                <Classform user={props.user} submitNewClass={submitNewClass}/>
                <Classes user={props.user} classes={userClasses} removeClass={removeClass}/>
            </div>
        </div>
    )
}


export default DashBoard