import React, { useEffect, useState } from 'react';
import axios from '../support-components/axios';
import BookingTable from "./BookingTable";
import Table from 'react-bootstrap/Table';
import "../support-components/TableStyle.css"


const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);

    let getBookings= () => {
        axios.get('/bookings')
            .then(res => {
                console.log(res.data);
                setBookings(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(getBookings , [])

    const DataTable = () => {
        return bookings.map((res, i) => {
            return <BookingTable data={res} key={i} onUpdate={getBookings} />;
        });
    }



    return (
        <div className="container view-bookings-wrap">
            <div className="row bookings-table">
                <h5>Trip Bookings:</h5>

                <Table striped bordered hover>
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>User Id</th>
                            <th className="tableHeader-2">Title</th>
                            <th>Name</th>
                            <th className="tableHeader-2">Email</th>
                            <th>City</th>
                            <th className="tableHeader-2">Address</th>
                            <th>Phone No</th>
                            <th>Seats</th>
                            <th>Total Price</th>
                            <th>Payment Method</th>
                            <th>Is Paid?</th>
                            <th>Booking Confirmed?</th>    
                            <th>Confirm Booking</th>                            
                            <th className="tableHeader-4">Booking Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DataTable()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ViewBookings;
