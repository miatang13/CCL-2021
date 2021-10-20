import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, Transition } from "react-transition-group";
import { playTransitionIn, playTransitionOut } from "./utility/animation";
import { Landing } from "./pages/landing";
import { CensusMap } from "./pages/map";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          render={({ location }) => {
            const { pathname, key } = location;
            return (
              <TransitionGroup component={null}>
                <Transition
                  native
                  key={key}
                  appear={true}
                  onEnter={(node) => playTransitionIn(pathname, node)}
                  onExiting={(node) => playTransitionOut(pathname, node)}
                  timeout={{ enter: 300, exit: 350 }}
                >
                  <Switch location={location}>
                    <Route exact path="/" component={Landing} />
                    <Route path="/p5map" component={CensusMap} />
                  </Switch>
                </Transition>
              </TransitionGroup>
            );
          }}
        ></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
