import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import ParkingInput from './components/ParkingForm/ParkingInput';
import ParkingSlotList from "./components/ParkingSlots/ParkingSlotList";
import ParkingLotProvider from "./store/ParkingLotProvider";

const App = () => {
    return (
        <ParkingLotProvider>
            <Header />
            <main>
                <ParkingInput />
                <ParkingSlotList  />
            </main>
        </ParkingLotProvider>
    );
};

export default App;
