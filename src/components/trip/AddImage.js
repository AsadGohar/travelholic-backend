import React, { useState,useEffect } from 'react';
import axios from "../support-components/axios";


import ImageViewer from './ImageViewer'

const AddImage = () => {
  
    // Setting up states
  const [id, setId] = useState('');
  
  const [trips,setTrips] = useState([])
  const [trip,setTrip]=useState({})
  

  useEffect(()=>{
    axios.get('/trips/')
    .then(res => {
      console.log(res.data)
      setTrips(res.data)
    })
    .catch(err=>console.log(err))

    axios.get(`/trips/${id}`)
    .then(res => {
      console.log(res.data);
      setTrip(res.data);
    })
    .catch((error) => {
        console.log(error);
    })
  },[id])

  return (
    <div className="container add-destination-wrap">
      <div className="row add-destination-form-div mt-3">
        <div className="col-md-7">
            {/* SElECT TRIP */}
            <div className="form-group">
              <label htmlFor="title-image">Trips:</label><br/>
              <select id="to" className="form-control" onChange={e=>setId(e.target.value)} >
                <option></option>
                {trips.map(trip => { 
                  return (
                    <option key={trip._id} value={trip._id}>{trip.title}</option>
                  )
                })}
              </select>
            </div>
            {
              id==='' || id===undefined ? (
                <h1>Please Select A Trip</h1>
              ):(
                <ImageViewer data={trip} />
              )
            }
        </div>
      </div>
    </div>
  );
}

export default AddImage;
