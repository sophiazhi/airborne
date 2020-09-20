import React from 'react';
import './App.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

import Search from './Search';
import Contribute from './Contribute';

function App() {
  return (
    <div className="App">
      <div className="header"><h>Airborne</h></div>
      <Tabs defaultActiveKey="search" id="main-tabs" variant="pills" className="tabs">
        <Tab eventKey="search" title="Search">
          <Search />
        </Tab>
        <Tab eventKey="contribute" title="Contribute">
          <Contribute />
        </Tab>
      </Tabs>
    </div>
    /*<Tab.Container defaultActiveKey="search" className="body">
      <Row>
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link eventKey="search">Search</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contribute">Contribute</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
        <Tab.Content>
          <Tab.Pane eventKey="search">
            <Search />
          </Tab.Pane>
          <Tab.Pane eventKey="contribute">
            <Contribute />
          </Tab.Pane>
        </Tab.Content>
      </Row>
    </Tab.Container>*/
  );
}

export default App;
