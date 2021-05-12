import React, { useEffect, useState } from 'react';
import axios from '../support-components/axios';
import ReviewTable from "./ReviewTable";
import Table from 'react-bootstrap/Table';


const ViewTripReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('/reviews')
            .then(res => {
                console.log(res.data);
                setReviews(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const DataTable = () => {
        return reviews.map((res, i) => {
            return <ReviewTable data={res} key={i} />;
        });
    }



    return (
        <div className="container view-reviews-wrap">
            <div className="row reviews-table">
                <h5>Trip reviews:</h5>

                <Table striped bordered hover>
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Review Text</th>
                            <th>Reported</th>
                            <th>createdAt</th>
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

export default ViewTripReviews;