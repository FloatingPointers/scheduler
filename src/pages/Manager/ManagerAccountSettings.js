import React, {useState, useEffect} from "react";
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';

import '../../styles/manager.css';



function ManagerAccountSettings() {

    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [state, setState] = useState(
        {       
            name: "",
            email: "",
            startDay: "",
            openTime: "",
            closeTime: "",
            roles: []
        }
    );

    useEffect(() => {
        console.log(state);
        //THIS IS WHERE WE POST CHANGES
    });

    const handleChange = (event) => { 
        const {id, value} = event.target;
        setState({
            ...state, 
            [id]: value
        });
        console.log(state);
    }

    /*
        Settings:   
        Name
        email
        Schedule start day
        Open time
        Close time
        Manage Roles - show all roles , allow add (or delete)

    */

    return (

        <div className="manager-body">
            <ManagerNavbar/>
            <h2>Change Account Settings</h2>

            <div className="label-input-combo">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={state.name} onChange={handleChange} />
            </div>
            
            <div className="label-input-combo">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={state.email} onChange={handleChange}/>
            </div>

            <div className="label-input-combo">
                <label htmlFor="startDay">Schedule Start Day</label>
                <input id="startDay" name="startDay" type="text" value={state.startDay} onChange={handleChange}/>
            </div>

            <div className="label-input-combo">
                <label htmlFor="openTime">Open Time</label>
                <input id="openTime" name="openTime" type="text" value={state.openTime} onChange={handleChange}/>
            </div>

            <div className="label-input-combo">
                <label htmlFor="closeTime">Close Time</label>
                <input id="closeTime" name="closeTime" type="text" value={state.closeTime} onChange={handleChange}/>
            </div>

            <div>
                <h3>Manage Roles</h3>
                <ul>
                    {state.roles.map((role, index) => (
                        <li key= {index}>{role}</li>
                    ))}
                </ul>
                <button onClick={() => setState({...state, roles: [...state.roles, "New Role"]})}>Add Role</button>
                <button onClick={() => setState({...state, roles: state.roles.slice(0, -1)})}>Delete Role</button>
            </div>
            

            {unsavedChanges && (
                <div>
                    <p>Bojo!</p>
                    {/* {<button onClick={handleSave}>Save Changes</button> } */}
                </div>
            )}

        </div>

    );

}

export default ManagerAccountSettings;