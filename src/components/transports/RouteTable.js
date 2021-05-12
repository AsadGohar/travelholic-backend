import React from 'react';
import axios from "../support-components/axios";
import {  useSelector } from 'react-redux';


const RouteTable = (props) => {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
  const { _id,createdAt, updatedAt,destination_to,destination_from, fare} = props.data
  const id = props.transport
  const getRoutes = props.getRoutes
  //console.log(_id,createdAt, updatedAt,destination_to,destination_from, fare)
  
  const deleteRoute = () => {
      axios.delete(`/transports/route/delete`,{ data: {route_id:_id,transport_id:id} },{
        headers: {
          Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
        }
       })
      .then((res) => {
          console.log('Route deleted!')
          getRoutes()
      }).catch((error) => {
          console.log(error)
      })
  }

  return (
    <tr>
      <td>{_id}</td>
      <td>{destination_to && destination_to.name}</td>
      <td>{destination_from && destination_from.name}</td>
      <td>{fare}</td>
      <td>{createdAt.substring(0,10)}</td>
      <td>{updatedAt.substring(0,10)}</td>
      <td style={{columnWidth:100}}>
          <button style={{ cursor: 'pointer', color: 'red' }} className="btn fa fa-trash fa-2x" onClick={deleteRoute} size="sm" variant="danger"></button>
      </td>
    </tr>
  );
}

export default RouteTable;
