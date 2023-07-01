import React, { useState } from "react";


import '../../styles/manager.css';


import generateDummySchedule from "./SchedulerHome.js";


function DailyView() {

    const[schedule, setSchedule] = useState(generateDummySchedule());

    return (
        <div>
            Daily view
        </div>
    );

}


export default DailyView;