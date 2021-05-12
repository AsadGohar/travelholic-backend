import React from 'react';
import Table from 'react-bootstrap/Table';
import RouteTable from './RouteTable'
import "../support-components/TableStyle.css"


const ViewRoutes = (props) => {
  const {routes}=props.data
  const id = props.transport
  const getRoutes = props.getRoutes
  console.log('id in view rout',id)
  return (
    <div className="container view-destinations-wrap">
      <div className="row destinations-table">
        <div className="ml-3"></div>
        {
          routes && routes.length >0 ?
          (
            <Table striped bordered hover>
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Destination To</th>
                <th>Destination From</th>
                <th>Fare</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {routes && routes.map((res, i) => {
                return <RouteTable transport={id} data={res} key={i} getRoutes={getRoutes}/>;
              })}
            </tbody>
          </Table>
      
          ):
          (
            <h1>No Routes Available</h1>
          )
        }
          
          
      </div>
    </div>
  );
}

export default ViewRoutes;
