import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignUpOne from "./components/registration";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SignUpOne />
    </>
  );
}

export default App;
