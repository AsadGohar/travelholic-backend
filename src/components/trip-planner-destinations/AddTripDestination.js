import React, { useState } from 'react';
import axios from "../support-components/axios";
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';



const AddTripDestination = () => {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    // Setting up states
  const [name, setName] = useState('');
 

  const submitDestination = (e) => {
    e.preventDefault()
    axios.post('/tripplannerdestination/', {name},{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     })
    .then(res =>{
      toast.success("Trip Planner Destination Added", {
        position: toast.POSITION.TOP_CENTER
      });
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className="container add-destination-wrap">
      <div className="row">
        <h5 className="Display-1">Add Trip Planner Destination</h5>
      </div>
      <div className="row add-destination-form-div mt-3">
        <div className="col-md-7">
          <form onSubmit={submitDestination}>
            {/* SET HOTEL NAME */}
            <div className="form-group">
              <label htmlFor="destination-title">Trip Planner Destination Name</label>
              <input type="text" className="form-control" onChange={e=>{setName(e.target.value)}} placeholder="Hotel Title" />
            </div>
            <button type="submit" className="btn btn-dark mb-5">Add Hotel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTripDestination;
