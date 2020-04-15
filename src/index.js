import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CurvedLineChart from './CurvedLineChart'
import AnimatedBarChart from './AnimatedBarChart'
import AddAxis from './AddAxis'

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <CurvedLineChart /> */}
    {/* <AddAxis /> */}
    <AnimatedBarChart />
  </React.StrictMode>,
  document.getElementById('root')
);


