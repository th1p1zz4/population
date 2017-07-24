import React, { Component } from 'react';
import './App.css';
import { 
  Navbar, Nav, NavItem, Row, Col, Grid, FormGroup,
  FormControl, ControlLabel, Jumbotron, 
} from 'react-bootstrap';
import { Bar } from 'react-chartjs';


class App extends Component {

constructor(){
  super()
  this.year = 1950;
  this.state = {
    year: '',
    age: '',
    showHome: false,
    showComparacao: true,
    showEstatistica: false,
    validateAge : this.validateAge.bind(this),
    validateYear: this.validateYear.bind(this),
    chartData: { datasets: [
        {
            data: [20, 50],
            label: 'Mulher',
            yAxisID: 'left-y-axis',
            fillColor : [
              'rgba(255, 99, 132, 0.2)'
            ]
        },{
            data: [10, 40],
            label: 'Homem',
            yAxisID: 'right-y-axis',
            fillColor : [
              'rgba(54, 162, 235, 0.2)'
            ]
        }],
        labels: ['2016', '2017']
    }
  };
}

  render() {
    return (
      <div className="App">
        <Grid fluid={true}>
          { this.navbarInstance }
          { this.showView() }
          <hr/>
          <Row>
            <Col>
              <ControlLabel>País: Alemanha</ControlLabel>
            </Col>
          </Row>
          
          <Bar data={this.state.chartData} width="400" height="250"/>
        </Grid>
      </div>
    );
  }

handleSelected(eventKey) {
    if (eventKey === 1) {
      this.setState({showHome: false});
      this.setState({showComparacao: true});
    } else {
      this.setState({showHome: true});
      this.setState({showComparacao: false});
    }
    // fetch('http://api.population.io/1.0/population/1982/aged/18/')
    //   .then(function(response) {
    //     console.log(response.json());
    //     console.log(eventKey);
    //   })
}

validateYear(e){
  const re = /^[a-z]{1950,2017}$/
  
  console.log(this)
    if (!re.test(this.year)) {
      return 'error';
    } else {
      return 'success'
    }
}

validateAge(e){
  const re = /^[a-z]{0,100}$/
  console.log(this.state)
    if (!re.test(this.age)) {
      return 'error';
    } else {
      return 'success';
    }
}

navbarInstance = (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a>População</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav onSelect={ this.handleSelected.bind(this) }>
      <NavItem eventKey={1} >Comparação</NavItem>
      <NavItem eventKey={2} >Estatística</NavItem>
    </Nav>
  </Navbar>
);

homeInstance = (
  <Jumbotron>
    <h1 className="text-left">População</h1>
    <p className="text-left">O intuito deste exemplo é fazer: </p>
    <hr/>
    <ul >
      <li className="text-left">Uma comparação de uma população de um <strong>ano</strong> e uma <strong>idade</strong> com o ano atual</li>
      <li className="text-left">Uma progressão estatística do ano e idade escolhido com a análise 10 anos pra frente.</li>
    </ul>
    <hr/>
    <p className="text-left">Navegue entre os menus na parte de cima</p>
  </Jumbotron>
);

comparacaoInstance = (
  <form>
      <Row>
        <Col sm={4}>
        <FormGroup
            controlId="formYear"
            validationState={this.validateYear()} >
          <ControlLabel>Ano: </ControlLabel>
          <FormControl type="number" placeholder="Ano" value={this.year}/>
          <FormControl.Feedback />
        </FormGroup>
        </Col>
        <Col sm={4}>
          <FormGroup
              controlId="formAge"
              validationState={this.validateAge()} >
            <ControlLabel>Idade: </ControlLabel>
            <FormControl type="number" placeholder="Idade" value={this.age}/>
            <FormControl.Feedback />
          </FormGroup>
        </Col>
        <Col sm={4}>
          <ControlLabel>País: </ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option value="brasil">Brasil</option>
            <option value="alemanha">Alemanha</option>
          </FormControl>
        </Col>
      </Row>
      
  </form>
);

showView() {
  if (this.state.showHome) {
    return this.homeInstance;
  } else if (this.state.showComparacao) {
    return this.comparacaoInstance;
  }
}

}
export default App;
