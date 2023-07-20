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
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="text-2x1 font-semibold mb-4 ">Employee Name: {employee}</h2>
      <div className="bg-white shadow shadow-slate-600 rounded-lg p-5 w-80">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label>
          Shift Start:
          <input
            className=" mt-2 block w-full border-2 border-blue-300 rounded-md py-2 px-3 mb-5"
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
            className=" mt-2 block w-full border-2 border-blue-300 rounded-md py-2 px-3 mb-5"
            type="time"
            name="end"
            value={end}
            step={1800}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add to Shift</button>
      </form>
      </div>
    </div>
  );
}

export default EditingView;
