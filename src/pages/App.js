import React, {useState} from "react"
import ManagerLogin from "../components/app-components/ManagerLogin";
import EmployeeLogin from "../components/app-components/EmployeeLogin";
import "../styles/App.css"



function App() {
  const [state, setState] = useState("Manager");

  const loginDisplay = () => {
    if(state === "Manager") {
      return <ManagerLogin/>;
    } else if(state === "Employee"){
      return <EmployeeLogin/>;
    } else {
      console.log("I've been graped");
    }
  }
  
  return (
    <div className="login">
      <h1>LOG IN</h1>
      <div >
        <button onClick={() => {setState("Manager")}}>Manager</button>
        <button onClick={() => {setState("Employee")}}>Employee</button>
      </div>
      {loginDisplay()}
    </div>
  );
}

export default App;