import React,{useState,useEffect} from 'react'
import axios from "../support-components/axios"


// Components of Admin Screen Imported Here
import AdminList from "./AdminList"
import CreateAdmin from "./CreateAdmin"

const ViewAdmins = () => {

    const [admins, setAdmins] = useState()

    const getAdmins = () =>{
        axios.get('/admin')
        .then(res=>{
            console.log(res.data)
            setAdmins(res.data)
        })
    }

    useEffect( () => {
        axios.get('/admin')
        .then(res=>{
            console.log(res.data)
            setAdmins(res.data)
        })
    }, [])

    return (
        <div className="ml-2">
            <div className="authorized-admin-div">
                <AdminList refresh={getAdmins} newAdmins= {admins} />
            </div>
            <hr />
            <div className="create-admin-div">
                <CreateAdmin refresh={getAdmins} />
            </div>
        </div>
    )
}

export default ViewAdmins
