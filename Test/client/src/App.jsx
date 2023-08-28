

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import TrainList from './TrainList';
import TrainDetailPage from './TrainDetailPage';

function App() {
  return (

    <div>
      <Routes>

        <Route path="/" element={<TrainList />} />
        <Route path="/trains/:trainNumber" element={<TrainDetailPage />} />

      </Routes>
      <TrainList/>
    </div>
    
  );
}

export default App;

