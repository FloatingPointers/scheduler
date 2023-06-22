import React from 'react';
import { useState, useEffect } from 'react';

function EmployeeManagementRow({ employeeInfo }) {	//Data representative of what's on the database
	const [editable, setEditable] = useState(false);
	const [info, setInfo] = useState(employeeInfo);
	const [editInfo, setEditInfo] = useState(employeeInfo); //Local data (edits for posting to database)
	const [post, setPost] = useState(false);
  const handleChange = (event) => {
    
		let {name, value } = event.target;

    //Return if the value was not changed
    if(info[name] === value) return;

    //Otherwise update to the new value for a post request (to be done later when changes are submitted by user)
    setEditInfo({
			...editInfo,
			[name]: value
		});
  }


  //const poster
	const poster = () => {
		if(editInfo !== info){
			//POST THE INFO HERE EXACTLY
			setInfo(editInfo);
		}
		setEditable(false);
		setPost(false);
	}

	useEffect(() => {
		if(post) poster();
	});

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
				<td><button id={editInfo.uuid} onClick={() => { setPost(true) }}>Submit</button></td>
				
				<td><button onClick={() => { setEditable(false) }}>Cancel</button></td>
				<td><button>Delete</button></td>
			</tr>
		);
	}

}

export default EmployeeManagementRow;