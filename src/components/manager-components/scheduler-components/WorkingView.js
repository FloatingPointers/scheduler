import React, {useState, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';


//Table that shows who is currently working and their info. 


function WorkingView(props) {

    const [employees, setEmployees] = useState( [
        {
            employeeID: 1,
            name: "Tohno Akiha",
            startTime: "9:00 AM",
            endTime: "5:00 PM",
            roles: "Cashier"
        },
        {
            employeeID: 2,
            name: "Nanaya Shiki",
            startTime: "9:00 AM",
            endTime: "5:00 PM",
            roles: "Cashier"
        },
    ])

    //delete function
    const handleDelete = (employeeID) => {

        //Send shift delete request to schedule database

        //Delete shift from local schedule if the database responded with a success message
        const updatedEmployees = employees.filter((employee) => employee.employeeID !== employeeID);
        setEmployees(updatedEmployees);
        
        
    }

    //get request to get all employees working today
    const handleChanges = () => {
        //setEmployees(response.data)
    }


    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Shift</th>
                        <th>Role</th>
                        <th>X</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeID}>
                            <td>{employee.name}</td>
                            <td>{employee.startTime} - {employee.endTime}</td>
                            <td>{employee.roles}</td>
                            <td>
                                <Button onClick={() => handleDelete(employee.employeeID)}>
                                    X
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        </div>
    );
}
export default WorkingView;