import React, { useState } from 'react'
import axios from "../support-components/axios";
import { toast } from 'react-toastify';
import {  useSelector } from 'react-redux';


function AddTripForm() {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn

  const [itineraryDays, setItineraryDays] = useState(0)
  const [itinerary, setItinerary] = useState([])
  const [start_date, setStartDate] = useState()
  const [end_date, setEndDate] = useState()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [attractions, setAttractions] = useState('')
  const [excludes, setExcludes] = useState('')
  const [service_provided, setServicesProvided] = useState('')
  const [company, setCompany] = useState('')

  const list = []
  const itineraryData = []


  const pushToItineraryDataArray = (x, y) => {
    var json = { day: x, description: y }
    itineraryData.push(json)
  }
  const formRender = (days) => {
    for (let index = 1; index <= days; index++) {
      list.push(
        <div key={index} className="form-group">
          <label>Day : {index}</label>
          <input type="text" className="input-x form-control" />
        </div>
      )
    }
  }
  const onSave = (e) => {
    e.preventDefault()
    for (let index = 0; index < itineraryDays; index++) {
      var inputText = document.getElementsByClassName("input-x form-control")[index].value
      pushToItineraryDataArray(index, inputText)
    }
    setItinerary(itineraryData);
    console.log("onSave itinerary data", itineraryData)
    // console.log("onSave itinerary useState", itinerary)
  }

  const increase = (e) => {
    e.preventDefault()
    setItineraryDays(itineraryDays + 1)
  }
  const decrease = (e) => {
    e.preventDefault()
    setItineraryDays(itineraryDays - 1)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(itinerary)
    const tripObject = {
      itinerary: itinerary,
      title: title,
      price: price,
      description:description,
      attractions:attractions,
      excludes:excludes,
      service_provided:service_provided,
      start_date:start_date,
      end_date:end_date,
      company:company
    };
    axios.post(`/trips/`,tripObject,{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     })
    .then(res=>{
      toast.success("Trip Added", {
        position: toast.POSITION.TOP_CENTER
      });
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <div>
      <h5 className="Display-1">Add a new trip:</h5>
      <div className="row">
        <div className="col-md-7">
          <form className="container mt-2 pt-2 pb-4">
            <div className="form-group">
              <label>Title</label>
              <input onChange={e=> setTitle(e.target.value)} type="text" className="form-control" placeholder='Trip Title' />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input onChange={e=> setPrice(e.target.value)} type="number" className="form-control" min='0' placeholder='Trip Price e.g 15000' />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input onChange={e=> setDescription(e.target.value)} type="text" className="form-control" placeholder='Description (max 120 words)' />
            </div>
            <div className="form-group">
              <label>Attractions</label>
              <input onChange={e=> setAttractions(e.target.value)} type="text" className="form-control" placeholder='Describe trip atrractions' />
            </div>
            <div className="form-group">
              <label>Excludes</label>
              <input onChange={e=> setExcludes(e.target.value)} type="text" className="form-control" placeholder='Trip exludes' />
            </div>
            <div className="form-group">
              <label>Services Provided</label>
              <input onChange={e=> setServicesProvided(e.target.value)} type="text" className="form-control" placeholder='Describe services to be provided' />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input onChange={e=> setCompany(e.target.value)} type="text" className="form-control" placeholder='Company Name' />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input onChange={e=>{setStartDate(e.target.value)}} type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input onChange={e=>{setEndDate(e.target.value)}} type="date" className="form-control" />
            </div>
            <div className="form-group">
              <h5>Itinerary Days : {itineraryDays}</h5>
              <button onClick={increase} className="mt-4 btn btn-primary mr-2">Increase</button>
              <button onClick={decrease} className="mt-4 btn btn-danger">Decrease</button>
            </div>
            {/* <Itinerary set={setItinerary} days = {itineraryDays} /> */}
            {formRender(itineraryDays)}
            <div className="container mt-4 border border-dark pt-2 pb-4">
              <h3>Add Itinerary</h3>
              <div className="form-group">
                {list}
              </div>
              <button onClick={onSave} className="btn btn-success mt-1 mb-3">Save</button>
            </div>
            <button type="submit" onClick={onSubmit} className="mt-3 btn btn-dark mb-5">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTripForm
