import React from 'react'
import axios from "../support-components/axios";


function UserRow(props) {
  const { _id,updatedAt,createdAt,name,reported} = props.data
  const onDelete = props.onDelete;
  const deleteUser = ()=>{
    axios.delete(`/users/${_id}`).then((res)=>{
      console.log(res.data)
      onDelete()
    }).catch((err)=>{
      console.log(err)
    });
  }
  return (
    <tr>
      <th className="text-center" scope="row">{name}</th>
      <td className="text-center">{`${reported}`}</td>
      <td className="text-center">{createdAt.substring(0,10)}</td>
      <td className="text-center">{updatedAt.substring(0,10)}</td>
      <td className="d-flex justify-content-center del-btn-border">
        <button type="button" style={{ cursor: 'pointer', color: 'red' }} onClick=
        {e=>{deleteUser()}} className="btn fa fa-trash fa-2x"></button>
      </td>
    </tr>
  )
}

export default UserRow
