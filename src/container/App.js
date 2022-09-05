import React from 'react';

import CardList from '../component/CardList';
import { robots } from '../component/robots';
import SearchBox from '../component/SearchBox';
import Scroll from '../component/Scroll';
import './App.css'


// const state = {

// }

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
      return response.json();
      })
      .then(users => {
        this.setState({robots: users})
      })
      .catch(err => {
        this.setState({robots: robots})
      })
      
  }

  onSearchChange  = (event) => {
    this.setState({ searchfield: event.target.value })
    
    // console.log(filteredRobots);

  }
  render(){
    const filteredRobots = this.state.robots.filter(robot =>{
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
      
    })
    if(this.state.robots.length === 0){
      return (
        <div className='tc'>
          
          <h1 >Waiting for internet connection!</h1>

          <h2>Sorry! you don't have an active internet connection</h2>

            <p>try connecting to a wifi or turn on mobile data</p>

        </div>
      )
    }
  return (
    <div className='tc'>
      
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox searchChange={this.onSearchChange}/>
      <Scroll>
      <CardList robots={filteredRobots}/>
      </Scroll>
        
    </div>
  );
}
}

export default App;
