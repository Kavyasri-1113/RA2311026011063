import { useState } from "react";
import "./App.css";

const API_BASE_URL = "http://20.207.122.201/evaluation-service";

function App() {
const [studentInfo, setStudentInfo] = useState({
email: "km0707@srmist.edu.in",
name: "Kavyasri M",
mobileNo: "9444249004",
githubUsername: "Kavyasri-1113",
rollNo: "RA2311026011063",
accessCode: "QkbpxH",
});

const [clientID, setClientID] = useState("cc5002cb-e607-4f7e-828f-9d681c53f7a8");
const [clientSecret, setClientSecret] = useState("JUwzvvzhGYdMMSst");
const [tokenText, setTokenText] = useState("");
const [message, setMessage] = useState("");

function updateStudentField(e) {
const inputName = e.target.name;
const inputValue = e.target.value;

setStudentInfo((oldDetails) => ({
  ...oldDetails,
  [inputName]: inputValue,
}));

}

async function registerClient() {
setMessage("Registering client...");
setTokenText("");

try {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentInfo),
  });

  const data = await response.json();
  console.log("Register response:", data);

  // Keeping previous values if API does not send new ones
  setClientID(data.clientID || clientID);
  setClientSecret(data.clientSecret || clientSecret);

  setMessage("Client registered successfully");
} catch (error) {
  console.log("Registration error:", error);
  setMessage("Registration failed");
}

}

async function getAccessToken() {
setTokenText("");
setMessage("Getting access token...");

const authDetails = {
  email: studentInfo.email,
  name: studentInfo.name,
  rollNo: studentInfo.rollNo,
  accessCode: studentInfo.accessCode,
  clientID: clientID,
  clientSecret: clientSecret,
};

try {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authDetails),
  });

  const data = await response.json();
  console.log("Auth response:", data);

  if (data.access_token) {
    setTokenText(data.access_token);
    setMessage("Access token generated successfully");

   
  } else {
    setTokenText(JSON.stringify(data));
    setMessage("Token response received, but access token was missing");
  }
} catch (error) {
  console.log("Auth error:", error);
  setTokenText("Authentication failed");
  setMessage("Authentication failed");
}

}

return (
<div className="container">
<h1>Notification Client Registration</h1>

  {/* Basic student details */}
  <input
    name="email"
    value={studentInfo.email}
    placeholder="Email"
    onChange={updateStudentField}
  />

  <input
    name="name"
    value={studentInfo.name}
    placeholder="Name"
    onChange={updateStudentField}
  />

  <input
    name="mobileNo"
    value={studentInfo.mobileNo}
    placeholder="Mobile Number"
    onChange={updateStudentField}
  />

  <input
    name="githubUsername"
    value={studentInfo.githubUsername}
    placeholder="GitHub Username"
    onChange={updateStudentField}
  />

  <input
    name="rollNo"
    value={studentInfo.rollNo}
    placeholder="Roll Number"
    onChange={updateStudentField}
  />

  <input
    name="accessCode"
    value={studentInfo.accessCode}
    placeholder="Access Code"
    onChange={updateStudentField}
  />

  <button onClick={registerClient}>Register</button>

  {message && <p>{message}</p>}

  {clientID && (
    <div>
      <h3>Client Details</h3>
      <p>
        <strong>Client ID:</strong> {clientID}
      </p>
      <p>
        <strong>Client Secret:</strong> {clientSecret}
      </p>
    </div>
  )}

  <h2>Authentication</h2>

  <button onClick={getAccessToken}>Get Token</button>

  {tokenText && (
    <div>
      <h3>Access Token</h3>
      <p className="token">{tokenText}</p>
    </div>
  )}
</div>

);
}

export default App