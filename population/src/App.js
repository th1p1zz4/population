import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, NavItem, Row, Col, FormControl, ControlLabel, Jumbotron, Grid } from 'react-bootstrap';
import { Bar } from 'react-chartjs';


class App extends Component {

constructor(){
  super()
  this.state = {
    showHome: true,
    showComparacao: false,
    showEstatistica: false,
    chartData: { datasets: [{
            data: [20, 50],
            label: 'Mulher',
            yAxisID: 'left-y-axis',
            fillColor : [
              'rgba(255, 99, 132, 0.2)'
            ]
        }, {
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
  const re = /[0-9A-F]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
}

validateAge(e){
  const re = /[0-9A-F]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
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
    <h1>População</h1>
    <p>O intuito deste exemplo é fazer: </p>
    <p>Uma comparação de uma população de um <strong>ano</strong> e uma <strong>idade</strong> com o ano atual</p>
    <p>Uma progressão estatística do ano e idade escolhido com a análise 10 anos pra frente.</p>
    <p>Navegue entre os menus na parte de cima</p>
  </Jumbotron>
);

comparacaoInstance = (
  <Row>
    <Col sm={4}>
      <ControlLabel>Ano: </ControlLabel>
      <FormControl type="number" placeholder="Ano" min="1950" max="2017" onKeyPress={(e) => this.validateYear(e).bind(this)}/>
    </Col>
    <Col sm={4}>
      <ControlLabel>Idade: </ControlLabel>
      <FormControl type="number" placeholder="Idade" min="0" max="100" onKeyPress={(e) => this.validateAge(e).bind(this)}/>
    </Col>
    <Col sm={4}>
      <ControlLabel>País: </ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="brasil">Brasil</option>
        <option value="alemanha">Alemanha</option>
      </FormControl>
    </Col>
  </Row>
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
