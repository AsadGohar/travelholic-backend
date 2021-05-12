import React, { useEffect, useState } from 'react';
import axios from '../support-components/axios';
import HotelTable from "./HotelTable";
import Table from 'react-bootstrap/Table';
import "../support-components/TableStyle.css"


const ViewHotels = () => {
	const [hotels, setHotels] = useState([]);

	useEffect(() => {
		axios.get('/hotels')
		.then(res => {
				// console.log(res.data);
				setHotels(res.data);
		})
		.catch((error) => {
				console.log(error);
		})
	}, [])

	const DataTable = () => {
		return hotels.map((hotel, i) => {
				return <HotelTable data={hotel} key={i} />;
		});
	}

return (
	<div className="container view-hotels-wrap">
		<div className="row hotels-table">
			<h5>Hotels:</h5>
			<Table striped bordered hover>
				<thead className="thead-dark">
					<tr>
						<th>Id</th>
						<th className="tableHeader-2">Hotel Name</th>
						<th className="tableHeader-3">Luxury Rent</th>
						<th className="tableHeader-3">Budget Rent</th>
						<th className="tableHeader-3">Contact Number</th>
						<th className="tableHeader-3">Created At</th>
            <th className="tableHeader-3">Updated At</th>
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

export default ViewHotels;
