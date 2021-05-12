import React,{useState} from 'react'
import axios from "../support-components/axios";

import DestinationRow from './DestinationRow'

function TripDestinationsTable() {
  const [destinations, setDestinations] = useState([]);
  const getDestinations = () => {
    axios.get('/tripplannerdestination/').then((res)=>{
      console.log(res.data)
      setDestinations(res.data);
    }).catch((err)=>{
      console.log(err)
    });
  }
  React.useEffect(getDestinations,[])
  return (
    <div className="container mt-4" >
       <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th className="text-center" scope="col">Name</th>
            <th className="text-center" scope="col">Created At</th>
            <th className="text-center" scope="col">Updated At</th>
            <th className="text-center" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {destinations.map(destination => { // using props in child component and looping
          return (
            <DestinationRow data={destination} key={destination._id} onDelete = {getDestinations}/>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default TripDestinationsTable
