import React,{useState} from 'react'
import axios from "../support-components/axios";
import {  useSelector } from 'react-redux';
import { toast } from 'react-toastify';



function ImageViewer(props) {

  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
  const {_id,title,display_image} = props.data
  const [file,setFile]=useState('default.jpg')

  const updateImage = (e) => {
    e.preventDefault()

    const formData = new FormData()
		formData.append('id',_id)
		formData.append('photo',file)
		formData.append('name',title)
		console.log('formData' +formData.get('id'))

    axios.put('/trips/upload',formData ,{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     })
    .then(res => {
      toast.success("Image Updated", {
        position: toast.POSITION.TOP_CENTER
      });
      window.location.reload()
    })
    .catch(err=>console.log(err))

  }
  
  return (
    <div>
      <form>
        {
          display_image && <img src={`http://localhost:4000/uploads/trips/${display_image}`} className="avatar img-circle img-thumbnail" alt="avatar" />
        }
        <input id="file-input" type="file" className="mt-2 text-center center-block" onChange={e=>{setFile(e.target.files[0])}} />
        </form>
        <button onClick={updateImage} type="submit" className="btn btn-dark mt-2 mb-5">Update Image</button>
    </div>
  )
}

export default ImageViewer
