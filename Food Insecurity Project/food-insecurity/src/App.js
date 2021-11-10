import "./App.css";
import "./styles/transition.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Landing from "./pages/Landing";
import Matrix from "./pages/Matrix";
// import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CSSTransition>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/matrix" component={Matrix} />
          </Switch>
        </CSSTransition>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*

 <Route
          render={({ location }) => {
            const { pathname, key } = location;
            return (



            
 */
