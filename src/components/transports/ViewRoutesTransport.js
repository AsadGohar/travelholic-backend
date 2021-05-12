import React,{useState,useEffect} from 'react';
import ViewRoutes from './ViewRoutes'
import axios from '../support-components/axios';

function ViewRoutesTransport() {

  const [transports,setTransports] = useState([])
  const [routes, setRoutes] = useState([]);
  const [id, setId] = useState('');

  const handleSetId = (transid) =>{
    setId(transid)
  }
  const getRoutes = () => {
    axios.get(`transports/routes/${id}`)
    .then(res => {
      console.log(res.data);
      setRoutes(res.data);
    })
    .catch((error) => {
        console.log(error);
    })
   
  }
  useEffect(()=>{ 

    axios.get(`transports/routes/${id}`)
    .then(res => {
      console.log(res.data);
      setRoutes(res.data);
    })
    .catch((error) => {
        console.log(error);
    })
    axios.get('/transports')
    .then(res => {
      console.log(res.data)
      setTransports(res.data)
    })
    .catch(err=>console.log(err))
    }, [id])

  return (
    <div>
      <div className="form-group">
      <h5>Routes:</h5>
        <label htmlFor="title-image">Select Transport Company</label><br/>
        <select id="to" className="form-control" 
        onChange={e=>handleSetId(e.target.value)} >
          <option></option>
          {transports.map(transport => { 
            return (
              <option value={transport._id}>{transport.name}</option>
            )
          })}
        </select>
      </div>
      {
        id==='' || id===undefined ? (
          <h1>Please Select A Transport</h1>
        ):(
          <ViewRoutes transport={id} data={routes} getRoutes={getRoutes}/>
        )
      }
    </div>
  )
}

export default ViewRoutesTransport
