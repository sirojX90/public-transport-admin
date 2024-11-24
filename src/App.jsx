import { useState } from "react";
import "./App.css";
import Authentication from "./Authentication";
import UnAuthentication from "./UnAuthentication";

function App() {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token")) || false
  );
  const [signUpData, setSignUpData] = useState(
    JSON.parse(window.localStorage.getItem("newToken")) || false
  );
  if (signUpData) {
    if (
      token.login == signUpData.newLogin &&
      token.password == signUpData.newPassword
    ) {
      return <Authentication setToken={setToken} />;
    } else {
      return (
        <UnAuthentication setToken={setToken} setSignUpData={setSignUpData} />
      );
    }
  } else {
    if (token.login == "Nurbek" && token.password == "123") {
      return <Authentication setToken={setToken} />;
    } else {
      return (
        <UnAuthentication setToken={setToken} setSignUpData={setSignUpData} />
      );
    }
  }
}

export default App;