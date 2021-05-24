import React, { useContext } from 'react';
import './App.css';

import Header from './components/Header/Header';
import ParkingInput from './components/ParkingForm/ParkingInput';
import ParkingSlotList from "./components/ParkingSlots/ParkingSlotList";
import ParkingSlotsProvider from "./store/ParkingSlotsProvider";

const App = () => {
    return (
        <ParkingSlotsProvider>
            <Header />
            <main>
                <ParkingInput />
                <ParkingSlotList  />
            </main>
        </ParkingSlotsProvider>
    );
};

export default App;
