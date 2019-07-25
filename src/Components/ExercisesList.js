import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

const DevTasks = props => (
  <tr>
    <td>{props.devTasks.username}</td>
    <td>{props.devTasks.description}</td>
    <td>{props.devTasks.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.devTasks._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDevTask(props.devTasks._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)
    this.deleteDevTask = this.deleteDevTask.bind(this)

    this.state = {
      exercises: [],
      devtasks: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/dev-tasks/')
      .then(response => {
        this.setState({ devtasks: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  deleteDevTask(id) {
    axios.delete('http://localhost:5000/dev-tasks/'+id)
    .then(response => { console.log(response.data)});
    
    this.setState({
    devtasks: this.state.devtasks.filter(el => el._id !== id)
  })
}

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  devTaskList() {
    return this.state.devtasks.map(currentdevtasks => {
      return <DevTasks devTasks={currentdevtasks} deleteDevTask={this.deleteDevTask} key={currentdevtasks._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          { this.exerciseList() }
          </tbody>
        </table>
      <h3>Logged Dev Tasks</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
          <th>Username</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        { this.devTaskList() }
        </tbody>
      </table>
    </div>
    )
  }
}