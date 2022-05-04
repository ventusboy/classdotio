import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Classform from "../components/Classform"
import Classes from "../components/Classes"
const ClassesContext = createContext(null)


function DashBoard(props) {
    const [userClasses, setUserClasses] = useState([])
    const [changes, setChanges] = useState(0)
    const [completedClasses, setCompletedClasses] = useState([])
    const [editedClass, setEditedClass] = useState({})
    axios.defaults.headers.common['sub'] = props.user.sub;


    useEffect(() => {
        async function getClasses() {
            let { data } = await axios.post('/getUserInfo')
            setUserClasses(data)
        }
        getClasses()
    }, [changes])

    useEffect(() => {
        let array = userClasses.flatMap(element => element.completed ? element.area + element.code : [])
        setCompletedClasses(array)
        // console.log(array)

    },[userClasses])

    async function submitNewClass(classInfo) {
        try {
            await axios.post('/submit', classInfo)
            setUserClasses([...userClasses, classInfo])
            setChanges(changes + 1)
        } catch (error) {
            console.log(error)
        }
        return
    }
    

    function editClass(classInfo) {
        console.log(classInfo)
        try {
            setEditedClass(classInfo)
        } catch (error) {
            console.log(error)
        }
        return
    }

    async function removeClass(obj) {
        setUserClasses(userClasses.filter(item => item.area + item.code !== obj.area + obj.code))
        await axios.post('/delete', obj)
        setChanges(changes + 1)
    }

    return (
        <div id="dashboard" className="d-flex flex-grow-1 container-fluid mt-3" >
            <div className="row flex-column flex-md-row flex-grow-1 justify-content-center justify-content-md-evenly g-3">
                <Classform user={props.user} classes={userClasses} submitNewClass={submitNewClass} editedClass={editedClass} />
                <ClassesContext.Provider value={completedClasses}>
                    <Classes user={props.user} classes={userClasses} removeClass={removeClass} editClass={editClass} /> 
                </ClassesContext.Provider>
            </div>
        </div>
    )
}

export { ClassesContext }
export default DashBoard