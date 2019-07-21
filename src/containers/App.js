import React, { Component } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox' 
import Scroll from '../components/Scroll'
import './App.css'

export class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots:users}));
  }

  // use arrow function to make sure this is referring to class App
  onSearchChange = (event) => {
    this.setState({searchField: event.target.value});
  }

  render() {
    const { robots, searchField } = this.state;
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    // if too many users
    if(!robots.length) {
      return <h1>Loading</h1>
    }

    return (
      <div className="tc">
        <h1 className='f2'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>      
    );
  }

}

export default App;