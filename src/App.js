import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import ParkingInput from './components/ParkingForm/ParkingInput';
import ParkingSlotList from "./components/ParkingSlots/ParkingSlotList";
import Vehicle from "./components/Vehicle/Vehicle";
import ParkingSlotsProvider from "./store/ParkingSlotsProvider";

const App = () => {
    return(
        <ParkingSlotsProvider>
            <Header />
            <main>
                <ParkingInput />
                <ParkingSlotList  />
                <Vehicle />
            </main>
        </ParkingSlotsProvider>
    );
};

export default App;
