import React from "react"
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';

import '../../styles/manager.css';



function ManagerHome() {

    return (
        <div className="manager-body">

            <ManagerNavbar />

            <p>I'm feeling at home</p>

        </div>
    );

};

export default ManagerHome;