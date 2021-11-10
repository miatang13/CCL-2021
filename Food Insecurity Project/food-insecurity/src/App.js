import "./App.css";
import "./styles/transition.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Landing from "./pages/Landing";
import Matrix from "./pages/Matrix";
import TerriPage from "./pages/stories/Terri";
import IkerPage from "./pages/stories/Iker";
// import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CSSTransition>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/matrix" component={Matrix} />
            <Route path="/stories/Terri" component={TerriPage} />
            <Route path="/stories/Iker" component={IkerPage} />
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
