import React, {useState} from "react";
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';

import '../../styles/manager.css';



function ManagerAccountSettings() {

    const [storeNum, setstoreNum] = useState("111111");
    const [password, setPassword] = useState("password");
    const[unsavedChanges, setUnsavedChanges] = useState(false);


    const handlestoreNumChange = (event) => {
        setstoreNum(event.target.value);
        setUnsavedChanges(true);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setUnsavedChanges(true);
    };

    const handleSave = (event) => {
        setUnsavedChanges(false);
        //backend stuff
    };

    return (

        <div className="manager-body">
            <ManagerNavbar/>
            <h2>Change Account Settings</h2>

            <div>
                <label>storeNum:</label>
                <input type="number" value={storeNum} onChange={handlestoreNumChange}/>
            </div>

            <div>
                <label>password:</label>
                <input type="password" value={password} onChange={handlePasswordChange}/>
            </div>

            {unsavedChanges && (
                <div>
                    <p>There are unsaved changes!!</p>
                    <button onClick={handleSave}>Save Changes?</button>
                </div>
            )}

        </div>

    );

}

export default ManagerAccountSettings;