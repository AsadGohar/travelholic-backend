import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from "../support-components/axios"
import {  useSelector } from 'react-redux';

const AdminList = (props) => {
   
    const admins = props.newAdmins
    const getAdmins =props.refresh
    const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
    console.log(`Bearer ${adminInfo.token}`)

    const renderAdminList = () => {
        if (admins) {
            return admins.map(admin =>
                <tr className="text-center" key={admin._id}>
                    <td>{admin._id}</td>
                    <td>{admin.name}</td>
                    <td>{admin.username}</td>
                    <td>{admin.isSuperAdmin ? 'Yes' : 'No'}</td>
                    <td>{admin.createdAt.substring(0, 10)}</td>
                    <td>
                        <i className='btn fa fa-trash' onClick={() => {
                            axios.delete(`/admin/${admin._id}`).then(() => {
                                getAdmins()
                            })
                        }}
                            style={{ cursor: 'pointer', color: 'red' }}></i>
                    </td>
                </tr>
            )
        }
    }



    return (
        <div>
            <div>
                <div className="float-left">
                    <h5>Authorized Admins</h5>
                </div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Admin ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Super Admin</th>
                        <th>Registered On</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {renderAdminList()}
                </tbody>
            </Table>

        </div>
    )
}

export default AdminList
