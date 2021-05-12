import React from 'react'
import axios from "../support-components/axios";
import {  useSelector } from 'react-redux';


function DestinationRow(props) {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
  const { _id,name,createdAt,updatedAt} = props.data
  const onDelete = props.onDelete;

  const deleteDestination = ()=>{
    axios.delete(`/tripplannerdestination/${_id}`,{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     }).then((res)=>{
      console.log(res.data)
      onDelete()
    }).catch((err)=>{
      console.log(err)
    });
  }
  return (
      <tr>
        <th className="text-center" scope="row">{name}</th>
        <td className="text-center">{createdAt.substring(0,10)}</td>
        <td className="text-center">{updatedAt.substring(0,10)}</td>
        <td className="d-flex justify-content-center del-btn-border">
          <button type="button" style={{ cursor: 'pointer', color: 'red' }} onClick={e=>{deleteDestination()}} className="btn fa fa-trash fa-2x"></button>
        </td>
      </tr>
  )
}

export default DestinationRow
