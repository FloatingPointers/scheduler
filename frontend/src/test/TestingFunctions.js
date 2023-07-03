//Generates a fake 7-day schedule for testing
export function generateDummySchedule() {

  let json = {
    _id: "schedule_id_placeholder_" + Math.floor(Math.random() * 100),
    storeId: "store_id_placeholder", // References the store the schedule belongs to
    weekStartDate: "2000-01-" + ((Math.floor(Math.random() * 3) * 7) + 1),
    goalsMet: Math.random() > 0.5,
    markedAsComplete: Math.random() > 0.5,
    format: [
      {
        date: "2000-01-01", //What is this used for????
        dayOfWeek: 0, // 0-6 representing Sunday-Saturday
        startTime: "00:00", //HH:MM
        endTime: "24:00",
        //settings
      },
      // Other shift-related fields
    ],
    day: [
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
      generateDummyDay(),
    ],
  }

  return (json);

}

//Generates a fake 1-day portion of a schedule for testing
export function generateDummyDay() {

  let hrs = Math.floor(Math.random() * 10)
  let emp_latest_start_time = 24 - hrs - 1;
  let emp_start_time = Math.floor(Math.random() * emp_latest_start_time);

  let json = {
    goalsMet: Math.random() > 0.5,
    markedAsComplete: Math.random() > 0.5,
    totalHours: hrs,
    totalCost: (hrs * 15),

    shifts: [
      {
        employeeId: Math.floor(Math.random() * 3),
        startTime: emp_start_time + ":00",
        endTime: (emp_start_time+hrs) + ":00",
      },
    ],
  }

  return(json);

}
