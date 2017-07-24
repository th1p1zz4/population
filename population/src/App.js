import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, NavItem 
} from 'react-bootstrap';

class App extends Component {

constructor(){
  super()
  this.buttons = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
}

  render() {
    return (
      <div className="App">
        { this.navbarInstance }
      </div>
    );
  }

handleSelected(eventKey) {

    fetch('http://api.population.io/1.0/population/1982/aged/18/')
      .then(function(response) {
        console.log(response.json());
        console.log(eventKey);
      })
}

navbarInstance = (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a>População</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav onSelect={ this.handleSelected }>
      <NavItem eventKey={1} >Comparação</NavItem>
      <NavItem eventKey={2} >Estatística</NavItem>
    </Nav>
  </Navbar>
);

}
export default App;
