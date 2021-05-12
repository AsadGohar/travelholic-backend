import React, { useState,useEffect } from 'react';
import axios from "../support-components/axios";
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';


const AddRouteToTransport = () => {

  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    // Setting up states
  const [id, setId] = useState('');
  const [destinationTo, setDestinationTo] = useState('');
  const [destinationFrom, setDestinationFrom] = useState('');
  const [fare, setFare] = useState('');
  const [destinations,setDestinations] = useState([])
  const [transports,setTransports] = useState([])

  useEffect(()=>{
    axios.get('/tripplannerdestination/')
    .then(res => {
      console.log(res.data)
      setDestinations(res.data)
    })
    .catch(err=>console.log(err))

    axios.get('/transports')
    .then(res => {
      console.log(res.data)
      setTransports(res.data)
    })
    .catch(err=>console.log(err))

  },[])


  const submitRoute = (e) => {
    e.preventDefault()

    const routeObject = {
      id:id,
      route:{
        destination_to:destinationTo,
        destination_from:destinationFrom,
        fare:fare
      }
    };

    axios.post('/transports/routes', routeObject,{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     })
    .then(res => {
      toast.success("Route Added", {
        position: toast.POSITION.TOP_CENTER
      });
    })
    .catch(err=>console.log(err))

  }

  return (
    <div className="container add-destination-wrap">
      <div className="row">
        <h5 className="Display-1">Add New Route</h5>
      </div>
      <div className="row add-destination-form-div mt-3">
        <div className="col-md-7">
          <form onSubmit={submitRoute}>
            {/* SET HOTEL NAME */}
            <div className="form-group">
              <label htmlFor="title-image">Select Transport Company</label><br/>
              <select id="to" className="form-control" onChange={e=>setId(e.target.value)} >
                <option></option>
                {transports.map(destination => { 
                  return (
                    <option value={destination._id}>{destination.name}</option>
                  )
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="title-image">Destination From</label><br/>
              <select id="to" className="form-control" onChange={e=>setDestinationTo(e.target.value)} >
                <option></option>
                {destinations.map(destination => { 
                  return (
                    <option value={destination._id}>{destination.name}</option>
                  )
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="title-image">Destination to</label><br/>
              <select id="to" className="form-control" onChange={e=>setDestinationFrom(e.target.value)} >
                <option></option>
                {destinations.map(destination => { 
                  return (
                    <option value={destination._id}>{destination.name}</option>
                  )
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="destination-title">Fare</label>
              <input type="num" min="0" className="form-control" onChange={e=>{setFare(e.target.value)}} placeholder="Fare" />
            </div>
            <button type="submit" className="btn btn-dark mb-5">Add Route</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRouteToTransport;
