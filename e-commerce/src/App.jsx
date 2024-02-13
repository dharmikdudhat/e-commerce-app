import SignUpOne from "./components/registration";
import { SignInOne } from "./components/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Route exact path="/">
        <SignUpOne/>
      </Route>
      <Route path="/login">
        <SignInOne/>
      </Route>
  </Router>
      <SignUpOne />
    </>
  );
}

export default App;
