import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "./components/Menu";
import TableRecipes from "./components/TableRecipes";
import RecipeInput from "./components/RecipeInput";
import Recepie from "./components/Recepie";

const App = () => {
  return (
    <Router>
      <Menu />
      <Container>
        <Switch>
          <Redirect exact from="/" to="/recipes" />
          <Route path="/recipes">
            <TableRecipes />
          </Route>
          <Route path="/addRecipe">
            <RecipeInput />
          </Route>
          <Route path="/recipe/:id">
            <Recepie/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
