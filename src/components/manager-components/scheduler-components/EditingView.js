import React from "react";


function EditingView({ currentShift, setCurrentShift }) {
  const { employee, start, end } = currentShift;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCurrentShift((prevShift) => ({ ...prevShift, [name]: value }));
  };

  const handleSubmit = (event) => {
    //submit to database
  };

  return (
    <div>
      <h2>Employee Name: {employee}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Shift Start:
          <input
            type="time"
            name="start"
            value={start}
            step={1800}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Shift End:
          <input
            type="time"
            name="end"
            value={end}
            step={1800}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add to Shift</button>
      </form>
    </div>
  );
}

export default EditingView;
