import React ,{ useState} from 'react'

function Itinerary(props) {
  const days = props.days
  const set = props.set
  // const [descriptions, setDescriptions] = useState([])
  const list = []
  const data = []
  // const addDescriptions= (newMessage,index) => setDescriptions(state => [...state, {day:index,description:newMessage}])
  const setJsonData = (x,y)=>{
      var json = {day:x,description:y}
      data.push(json)
  }
  const formRender = (days) =>{
    for (let index = 1; index <= days; index++) {
      list.push(  
      <div key={index} className="form-group">
        <label>Day : {index}</label>
        <input type="text" className="input-x form-control"/>
      </div>
    )
    }
  }
  const onSave = (e) =>{
    e.preventDefault()
    for (let index = 0; index < days; index++) {
      var inputText = document.getElementsByClassName("input-x form-control")[index].value
      setJsonData(index,inputText)
    }
    set(data)
    console.log("onSave" + data)
  }
  formRender(days)
  return (
    <div className="container mt-4 border border-dark pt-2 pb-4">
      <h3>Add Itinerary</h3>
      <div className="form-group">
        {list}
      </div>
      <button onClick={onSave} className="mt-4 btn btn-warning">Save</button>
    </div>
  )
}

export default Itinerary
