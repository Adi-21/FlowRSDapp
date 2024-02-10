import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './components/Authentication';
import RegisterLandForm from './components/RegisterLandForm';
import TransferOwnershipForm from './components/TransferLandForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact component={Authentication} />
          <Route path="/register" component={RegisterLandForm} />
          <Route path="/transfer" component={TransferOwnershipForm} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
