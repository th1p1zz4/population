import React, { Component } from 'react';
import './App.css';
import { SplitButton, MenuItem, Row, Col, Navbar, Nav, NavItem 
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
        { }
        
        <Row>
          <Col>
            { this.buttons.map((item) => (this.buttonsInstance(item))) }
          </Col>
        </Row>
      </div>
    );
  }

navbarInstance = (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a>População</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} >Comparação</NavItem>
      <NavItem eventKey={2} >Estatística</NavItem>
    </Nav>
  </Navbar>
);

buttonsInstance (item) {
this.buttonsView = 
      <SplitButton bsStyle={item} title={item}>
          <MenuItem eventKey="1">Action</ MenuItem>
          <MenuItem eventKey="2">Another action</ MenuItem>
          <MenuItem eventKey="3">Something else here</ MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4">Separated link</ MenuItem>
      </SplitButton>
return this.buttonsView;
};



}
export default App;
