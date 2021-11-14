import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Landing from "./pages/Landing";
import Matrix from "./pages/Matrix";
import "./styles/transition.css";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="App">
      <AnimatePresence>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/matrix" component={Matrix} />
        </Switch>
      </AnimatePresence>
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
