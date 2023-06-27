import React from "react";
import { differenceInHours } from 'date-fns'

function HourlyView(props) {
  let {shiftInfo} = props;
  
  let startTime = new Date([shiftInfo.date + "T" + shiftInfo.startTime]);
  let endTime = new Date([shiftInfo.date + "T" + shiftInfo.startTime]);
  let totalHours = differenceInHours(startTime, endTime, Math.ceil); //Allows for hourly view setup

  const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

  
  return (
    <div className="hourly">
      
      
    </div>
  );

}

export default HourlyView;