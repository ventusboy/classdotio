import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import Classform from "../components/Classform"
import Classes from "../components/Classes"


function DashBoard(props) {
    const [userClasses, setUserClasses] = useState([])
    let classes = []
    let classCount = 0
    
    
    useEffect(() => {
        async function getClasses () {
            let { data } = await axios.post('/getUserInfo', { email: props.user.email })
            classes = data
            console.log(data)
            classCount = classes.length
            setUserClasses(classes)
        }
        getClasses()
        // classes = getClasses()
    },[userClasses.length])

    async function submitNewClass (classInfo) {
        try {
            await axios.post('/submit', classInfo)
            setUserClasses([...userClasses, classInfo])
        } catch (error) {
            console.log(error)
        }
        return
    }

    return (
        <div className="container-fluid mt-3" >
            <div className="row justify-content-center justify-content-sm-evenly g-3">
                <Classform user={props.user} submitNewClass={submitNewClass}/>
                <Classes user={props.user} classes={userClasses} />
            </div>
        </div>
    )
}


export default DashBoard