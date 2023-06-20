import React from 'react';
import ManagerNavbar from '../../components/manager-components/ManagerNavbar';

import '../../styles/manager.css';



function EmployeeManager() {

    return (

        <div className="manager-body">  
            <ManagerNavbar/>
            <p>Employee Manager Page</p>
        </div>

    );

}

export default EmployeeManager;