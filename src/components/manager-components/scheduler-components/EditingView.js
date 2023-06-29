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
            type="text"
            name="start"
            value={start}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Shift End:
          <input
            type="text"
            name="end"
            value={end}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add to Shift</button>
      </form>
    </div>
  );
}

export default EditingView;
