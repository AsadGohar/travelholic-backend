import React, { useEffect, useState } from 'react';
import axios from '../support-components/axios';
import DestinationTable from "./DestinationTable";
import Table from 'react-bootstrap/Table';
import "../support-components/TableStyle.css"
import { Link } from 'react-router-dom';



const ViewDestinations = () => {
    const [destinations, setDestinations] = useState([]);

    let getDestinations = () => {
        axios.get('/destinations')
            .then(res => {
                console.log(res.data);
                setDestinations(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect( getDestinations , [])

    const DataTable = () => {
        return destinations.map((res, i) => {
            return <DestinationTable data={res} key={i} onDelete={getDestinations}/>;
        });
    }



    return (
        <div className="container view-destinations-wrap">
            <div className="row destinations-table">
                <h5>Destinations:</h5>
                <div className="ml-3">
                <Link to={"/add-new-destination"}><button className="rounded btn-dark mb-2"><i className="fa fa-plus-square" aria-hidden="true"></i> New Destination</button></Link>
                </div>
                <Table striped bordered hover>
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Title Image</th>
                            <th>Rating</th>
                            <th className="tableHeader-1">Introduction</th>
                            <th className="tableHeader-2">Attractions</th>
                            <th className="tableHeader-2">Photos</th>
                            <th className="tableHeader-1">Guidelines</th>
                            <th className="tableHeader-1">History</th>
                            <th className="tableHeader-4">Created At</th>
                            <th className="tableHeader-4">Updated At</th>
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

export default ViewDestinations;
