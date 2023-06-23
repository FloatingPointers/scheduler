import React from 'react';
import { useState, useEffect } from 'react';



function EmployeeManagementRow({ employeeInfo }) {	

  console.log("EMPLOYEE_MANAGEMENT_ROW::RENDER info=" + employeeInfo);

	const [editable, setEditable] = useState(false);		//Whether or not the component can be edited
	const [info, setInfo] = useState(employeeInfo);			//Data representative of what's on the database
	const [editInfo, setEditInfo] = useState(employeeInfo); //Local data (edits for posting to database)

  const [status, setStatus] = useState("none");


  //Called when any editable field is changed
  const handleChange = (event) => {
    
		let {name, value} = event.target;

    //Do nothing if the value was not changed
    if(info[name] === value) return;

    //Otherwise update to the new value for a post request (to be done later when changes are submitted by user)
    setEditInfo({
			...editInfo,
			[name]: value
		});

  }


  //Called when the user cancels an edit
  function handleCancelButton() {

	  setEditInfo(info); //Revert any edits made
	  setEditable(false);
	
  }



  //Called when the user requests to delete the employee represented by this component
  function handleDeleteButton() {

    setStatus("delete");

  }

  function handleSubmitButton() {

    setStatus("update");
    setEditable(false);

  }


  //const poster const poster
	const poster = () => {

    //Only post an update if the settings have actually been changed
		if(editInfo !== info) {
			//POST THE INFO HERE EXACTLY

			setInfo(editInfo);

		}

		setStatus("none");

	}


  //Called after the component is rendered, used to post filled information
	useEffect(() => {
		if(status === "update") {
      //Send update settings post request
			poster();
		} else if(status === "delete") {
      //Send delete employee post request
      
      
		}
	}, [status]);


  if(status === "delete")
    return;
  

	if (!editable) {
		return (
			<tr>
				<td>{info.name}</td>
				<td>{info.password}</td>
				<td><button onClick={() => { setEditable(true) }}>Edit</button></td>
			</tr>
		);
	} else {
		return (
			<tr>
				<td><input type="text" id={info.uuid} name="name" value={editInfo.name} onChange={handleChange}/></td>
				<td><input type="text" id={info.uuid} name="password" value={editInfo.password} onChange={handleChange}/></td>
				<td><button id={editInfo.uuid} onClick={handleSubmitButton}>Submit</button></td>
				
				<td><button onClick={handleCancelButton}>Cancel</button></td>
				<td><button onClick={handleDeleteButton}>Delete</button></td>
			</tr>
		);
	}

}

export default EmployeeManagementRow;