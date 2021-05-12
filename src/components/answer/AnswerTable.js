import React, { useState } from 'react';
import axios from "../support-components/axios";
import {  useSelector } from 'react-redux';

import AnswerRow from "./AnswerRow";

function AnswerTable() {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
  const [answers, setAnswers] = useState([]);
  const getAnswers = () => {
    axios.get('/answers/admin',{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     }).then((res)=>{
      console.log(res.data)
      setAnswers(res.data);
    }).catch((err)=>{
      console.log(err)
    });
  }
  React.useEffect(getAnswers,[setAnswers,adminInfo.token])
  return (
    <div className="container mt-4" >
      <h5>Answers:</h5>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th  className="text-center" scope="col">Username</th>
            <th className="text-center" scope="col">Answer Text</th>
            <th className="text-center" scope="col">Reported</th>
            <th className="text-center" scope="col">Created At</th>
            <th className="text-center" scope="col">Updated At</th>
            <th className="text-center" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {answers.map(answer => { // using props in child component and looping
              return (
                  <AnswerRow data={answer} key={answer._id} onDelete = {getAnswers}/>
              )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AnswerTable
