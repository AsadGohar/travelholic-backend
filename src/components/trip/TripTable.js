import React from 'react'
import axios from "../support-components/axios"
// import { Link } from 'react-router-dom'
import "../support-components/TableStyle.css"
import {  useSelector } from 'react-redux';



function TripTable(props) {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
  const trip = props.data
  const onDelete = props.onDelete;
  const deleteTrip = () => {
    axios.delete(`/trips/${trip._id}`,{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     }).then((res) => {
      console.log(res.data)
      onDelete()
    }).catch((err) => {
      console.log(err)
    });
  }
  return (
    <tr>
      <td >{trip._id}</td>
      <td >{trip.title}</td>
      <td >{trip.display_image}</td>
      <td >{trip.description}</td>
      <td >{trip.rating}</td>
      <td >{trip.attractions}</td>
      <td >{trip.excludes}</td>
      <td>
        {/* <Link className="edit-link mr-2 ml-3" to={"/edit-trip/" + trip._id}>
          <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
        </Link> */}
        <i className='btn fa fa-trash fa-2x' onClick={e => { deleteTrip() }} style={{ cursor: 'pointer', color: 'red' }}></i>
      </td>
    </tr>
  )
}

export default TripTable
