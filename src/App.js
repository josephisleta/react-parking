import React, { useContext } from 'react';
import './App.css';

import Header from './components/Header/Header';
import ParkingInput from './components/ParkingForm/ParkingInput';
import ParkingSlotList from "./components/ParkingSlots/ParkingSlotList";
import ParkingSlotsProvider from "./store/ParkingSlotsProvider";
import ParkingSlotsContext from "./store/parking-slots-context";

const App = () => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    return (
        <ParkingSlotsProvider>
            <Header />
            <main>
                {parkingSlotsContext.error && parkingSlotsContext.error.type === 'SERVER' && <div>{parkingSlotsContext.error.message}</div>}
                <ParkingInput />
                <ParkingSlotList  />
            </main>
        </ParkingSlotsProvider>
    );
};

export default App;
