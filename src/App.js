import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/Navbar";
import ExercisesDevList from "./Components/ExercisesDevList";
import EditExercise from "./Components/EditExercise";
import EditDevTask from "./Components/EditDevTask";
import CreateExercise from "./Components/CreateExercise";
import CreateDevTask from "./Components/CreateDevTask";
import CreateUser from "./Components/CreateUser";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExercisesDevList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/edit-dev-task/:id" component={EditDevTask} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/create-dev-task" component={CreateDevTask} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
