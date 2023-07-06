const sha256  = require('sha256');
const check  = require('express-validator');
export const generateHashedPassword = password => sha256(password);
export function generateServerErrorCode(res, code, fullError, msg, location = 'server') {
  const errors = {};
  errors[location] = {
    fullError,
    msg,
  };


return res.status(code).json({
    code,
    fullError,
    errors,
  });
}




//Converts "HH:mm" time format to a number in hours
function StringToHours(time) {

  const minutes = Number(time.split(":")[1]) / 60;
  const hours = Number(time.split(":")[0]);
  return minutes + hours;
  
}


//Returns true if the first given range is within the second range
function rangeOverlapping(rangeStart, rangeEnd, rangeStart2, rangeEnd2) {
  
  return (rangeStart >= rangeStart2 && rangeStart <= rangeEnd2) || (rangeEnd >= rangeStart2 && rangeEnd <= rangeEnd2);
  
}

function timeInRange(timeStart, timeEnd, rangeStart, rangeEnd) {

  return rangeOverlapping(StringToHours(timeStart), StringToHours(timeEnd), StringToHours(rangeStart), StringToHours(rangeEnd));

}
