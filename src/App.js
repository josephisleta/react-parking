import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import ParkingForm from './components/ParkingForm/ParkingForm';
import ParkingSlots from "./components/ParkingSlots/ParkingSlots";
import Vehicle from "./components/Vehicles/Vehicle";

function App() {
  return (
    <div>
      <Header />
      <ParkingForm />
      <ParkingSlots />
      <Vehicle />
    </div>
  );
}

export default App;
