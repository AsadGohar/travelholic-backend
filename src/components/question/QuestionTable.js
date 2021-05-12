import React,{useState} from 'react'
import axios from "../support-components/axios";
import {  useSelector } from 'react-redux';


import QuestionRow from './QuestionRow'

function QuestionTable() {
  const isAdminLoggedIn = useSelector(state => state.isLoggedIn)
	const { adminInfo } = isAdminLoggedIn
  const [questions, setQuestions] = useState([]);
  const getQuestions = () => {
    axios.get('/questions/admin',{
      headers: {
        Authorization:`Bearer ${adminInfo.token}` //the token is a variable which holds the token
      }
     }).then((res)=>{
      console.log(res.data)
      setQuestions(res.data);
    }).catch((err)=>{
      console.log(err)
    });
  }
  React.useEffect(getQuestions,[adminInfo.token])
  return (
    <div className="container mt-4" >
      <h5>Questions:</h5>
       <table className="table table-bordered table-striped" >
        <thead className="table-dark">
          <tr>
            <th className="text-center" scope="col">Username</th>
            <th className="text-center" scope="col">Question Statment</th>
            <th className="text-center" scope="col">Reported</th>
            <th className="text-center" scope="col">Created At</th>
            <th className="text-center" scope="col">Updated At</th>
            <th className="text-center" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {questions.map(question => { // using props in child component and looping
          return (
            <QuestionRow data={question} key={question._id} onDelete = {getQuestions}/>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default QuestionTable
