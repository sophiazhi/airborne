import React from 'react';
import './App.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Search from './Search';
import Contribute from './Contribute';

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="search" id="main-tabs">
        <Tab eventKey="search" title="Search">
          <Search />
        </Tab>
        <Tab eventKey="contribute" title="Contribute">
          <Contribute />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
