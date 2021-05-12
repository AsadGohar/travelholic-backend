import React, { useState } from 'react';
import axios from "../support-components/axios";
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';


const AddTransport = () => {

  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    // Setting up states
  const [name, setName] = useState('');

  const submitTransport = (e) => {
    e.preventDefault()

    const transportObject = {
      name: name
    };

    axios.post('/transports', transportObject,{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     })
    .then(res => {
        toast.success("Transport Added", {
          position: toast.POSITION.TOP_CENTER
        });
      })
    .catch(err=>console.log(err))

  }

  return (
    <div className="container add-destination-wrap">
      <div className="row">
        <h5 className="Display-1">Add New Transport:</h5>
      </div>
      <div className="row add-destination-form-div mt-3">
        <div className="col-md-7">
          <form onSubmit={submitTransport}>
            {/* SET HOTEL NAME */}
            <div className="form-group">
              <label htmlFor="destination-title">Transport Company Name</label>
              <input type="text" className="form-control" onChange={e=>{setName(e.target.value)}} placeholder="Transport Name" />
            </div>
            <button type="submit" className="btn btn-dark mb-5">Add Transport</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransport;
