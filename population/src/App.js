import React, { Component } from 'react';
import './App.css';
import { 
  Navbar, Nav, NavItem, Row, Col, Grid, FormGroup,
  FormControl, ControlLabel, Jumbotron, Modal, Button
} from 'react-bootstrap';
import { Bar } from 'react-chartjs';

class App extends Component {

constructor(){
  super()
  this.state = {
    year : '',
    age : '',
    listaDePopulacao: [
      { age:0,
        country:"Digite o ano e a idade",
        females:0,
        males:0,
        total:0,
        year:0,
    }],
    listaFiltered: [],
    showHome: true,
    showComparacao: false,
    showModal: false,
    hideChart: true,
  };
  this.callApi = this.callApi.bind(this);
  this.setYear = this.setYear.bind(this);
  this.setAge  = this.setAge.bind(this);
  this.getBarChart = this.getBarChart.bind(this);
  this.getComparacaoInstance = this.getComparacaoInstance.bind(this);
}

render() {
  return (
    <div className="App">
      <Grid fluid={true}>
        { this.navbarInstance }
        { this.showView() }
        <hr/>
        { this.getCountryView() }
        { this.getBarChart() }
      </Grid>
        { this.getModalInstance()}
    </div>
  );
}

// EVENTO: - Validação para exibição dos Menus

handleSelected(eventKey) {
    if (eventKey === 1) {
      this.setState({showHome: false});
      this.setState({showComparacao: true});
    } else {
      this.setState({showHome: true});
      this.setState({showComparacao: false});
    }
    
}

// EVENTO: - onBlur do TextField do Ano e verificação para chamar o serviço

setYear(e){
  this.setState({year: e.target.value});
  if ( this.state.age > 0) {
    var url = `http://api.population.io/1.0/population/${e.target.value}/aged/${this.state.age}/`
    var urlActual = `http://api.population.io/1.0/population/2017/aged/${this.state.age}/`
    // Buscar ano e idade escolhida
    this.callApi(url, 'listaDePopulacao')
    // Buscar ano atual da idade escolhida
    this.callApi(urlActual, 'listaDePopulacaoAtual')
  }
}

// EVENTO: - onBlur do TextField da Idade e verificação para chamar o serviço

setAge(e){
  this.setState({age: e.target.value});
  if (this.state.year > 0) {
    var url = `http://api.population.io/1.0/population/${this.state.year}/aged/${e.target.value}/`
    var urlActual = `http://api.population.io/1.0/population/2017/aged/${e.target.value}/`
    // Buscar ano e idade escolhida
    this.callApi(url, 'listaDePopulacao')
    // Buscar ano atual da idade escolhida
    this.callApi(urlActual, 'listaDePopulacaoAtual')
  }
}

// SERVICES: - Chamada do serviço

callApi(url, prop){
  fetch(url)
      .then(function(response) {
        if (response.ok) {
          return response.json().then(function(json){
            this.setState({[prop] : json})
          }.bind(this))
        } else {
          this.setState({showModal: true})
        }
    }.bind(this)).catch(function(erro){
      this.setState({showModal: true})
      console.log(erro)
    }.bind(this))
}

// VIEWS: - Exibição da barra de navegação

navbarInstance = (
  <Navbar inverse>
    <Nav onSelect={ this.handleSelected.bind(this) }>
      <NavItem eventKey={0} >Home</NavItem>
      <NavItem eventKey={1} >Comparação</NavItem>
    </Nav>
  </Navbar>
);

// VIEWS: - Exibição do conteúdo da Home

homeInstance = (
  <Jumbotron>
    <h1 className="text-left">População</h1>
    <p className="text-left">O intuito deste exemplo é fazer: </p>
    <hr/>
    <ul >
      <li className="text-left">Uma comparação de uma população de um <strong>ano</strong> e uma <strong>idade</strong> com o ano atual de um determinado País</li>
    </ul>
    <hr/>
    <p className="text-left">Selecione o menu acima</p>
  </Jumbotron>
);

// VIEWS: - View de Comparação

getComparacaoInstance(state){
  var comparacaoInstance = (
    <form>
        <Row>
          <Col sm={4}>
          <FormGroup controlId="formYear">
            <ControlLabel>Ano: </ControlLabel>
            <FormControl type="number" placeholder="Ano (De 1950 até 2017)" min="1950" max ="2017" onBlur={(e) => this.setYear(e)}/>
            <FormControl.Feedback />
          </FormGroup>
          </Col>
          <Col sm={4}>
            <FormGroup controlId="formAge">
              <ControlLabel>Idade: </ControlLabel>
              <FormControl type="number" placeholder="Idade (De 0 a 100)" min="0" max="100" onBlur={(e) => this.setAge(e)}/>
              <FormControl.Feedback />
            </FormGroup>
          </Col>
          <Col sm={4}>
            <ControlLabel>País: </ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={(e) => this.showChart(e)}>
              {state.listaDePopulacao.map(lista => 
                <option key={ lista.country } value={ lista.country }>{ lista.country }</option>
              )}
            </FormControl>
          </Col>
        </Row>
    </form>
  );

  return comparacaoInstance;
}

// VIEWS: - Dados e visibilidade do gráfico

showChart(e){
  var listFiltered = this.state.listaDePopulacao.filter( country => { if (country.country === e.target.value) return country});
  var listActualFiltered = this.state.listaDePopulacaoAtual.filter( country => { if (country.country === e.target.value) return country});

  var chart = { datasets: [
        {
            data: [listFiltered[0].females, listActualFiltered[0].females],
            label: 'Mulher',
            yAxisID: 'left-y-axis',
            fillColor : [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ]
        },{
            data: [listFiltered[0].males, listActualFiltered[0].males ],
            label: 'Homem',
            yAxisID: 'right-y-axis',
            fillColor : [
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ]
        }],
        labels: [this.state.year, '2017']
  }
  this.setState({listaFiltered: listFiltered},function() {
    this.setState({chartData: chart}, function(){
      this.setState({hideChart: false});
    })
  });
  
}

// VIEWS: - Exibição do gráfico

getBarChart(){
  if (!this.state.hideChart){
    var barChart = (
      <Grid fluid={true}>
        <Bar data={ this.state.chartData } width="800" height="300"/>
      </Grid>
    );
    return barChart;
  }
}

// VIEWS: - Exibição do País acima do gráfico

getCountryView(){
  if (!this.state.hideChart){
    var labelTop = (
      <Row>
        <Col>
          <ControlLabel>País: {this.state.listaFiltered[0].country}</ControlLabel>
        </Col>
      </Row>
    );
    return labelTop;
  }
}

// VIEWS: - Dados e visibilidade dos menus

showView() {
  if (this.state.showHome) {
    return this.homeInstance;
  } else if (this.state.showComparacao) {
    return this.getComparacaoInstance(this.state);
  }
}

// VIEWS: - Moda de erro
getModalInstance(){
  if (this.state.showModal) {
    var modalInstance = (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Houve um erro ao realizar a requisição.</p>
            <p>Confira novamente os parâmetros ou tente novamente mais tarde.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onSelect={this.close()}>Fechar</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
    return modalInstance;
  }
}

close() {
  this.setState({ showModal: false });
}

}
export default App;
