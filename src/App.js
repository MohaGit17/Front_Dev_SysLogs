import React, { useState } from 'react';
import './App.css';
import { Products } from './components/Securite/table';
import { SwitchTable } from './components/Reesau/SwitchTable';
import { DashTable } from './components/Dash/DashTable';
function App() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <>
    <div className="container">
      <div className="bloc-tabs">   
        <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Sécurité</button>
        <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Réseau</button>
        <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>Dashboard</button>
      </div>

      <div className="content-tabs" >
        <div style={{textAlign:"center"}} className={toggleState === 1 ? "content  active-content" : "content"}><Products /></div>
        <div style={{textAlign:"center"}} className={toggleState === 2 ? "content  active-content" : "content"}><SwitchTable /></div>
        <div className={toggleState === 3 ? "content  active-content" : "content"}><DashTable /></div>
      </div>
    </div>
    </>
  );
}

export default App;
