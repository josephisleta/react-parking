import React, { useRef, useContext } from 'react';

import Card from '../UI/Card';
import ParkingSlotsContext from "../../store/parking-slots-context";

const ParkingInput = () => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    const entryPointInputRef = useRef('');
    const plateNumberInputRef = useRef('');
    const typeInputRef = useRef('');
    const colorInputRef = useRef('');

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const form = {
            'entryPoint': entryPointInputRef.current.value,
            'plateNumber': plateNumberInputRef.current.value,
            'type': typeInputRef.current.value,
            'color': colorInputRef.current.value
        };

        parkingSlotsContext.enter(form);

        plateNumberInputRef.current.value = '';
        colorInputRef.current.value = '';
    };

    const updateEntryPointHandler = (event) => {
        parkingSlotsContext.updateEntryPoint(entryPointInputRef.current.value);
    };

    const entryPointOptions = [];

    for (let i = 1; i <= parkingSlotsContext.entryOrExitQuantity; i++) {
        entryPointOptions.push(<option value={i} key={i}>{i}</option>);
    }

   return (
       <form className="form">
            <Card>
                <div className="input entry-point-container">
                    <label htmlFor='entry-point'>Entry Point</label>
                    <select id="entry-point" name="entry-point" className="entry-point-select"
                            ref={entryPointInputRef}
                            value={parkingSlotsContext.currentEntryPoint}
                            onChange={updateEntryPointHandler}>
                        {entryPointOptions}
                    </select>
                </div>

                <div className="input">
                    <label htmlFor='plate-number'>Plate number</label>
                    <input id='plate-number' type='text' name='plate-number' ref={plateNumberInputRef} />

                    <label htmlFor='type'>Type</label>
                    <select name="type" id="type" ref={typeInputRef}>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>

                    <label htmlFor='color'>Color</label>
                    <input id='color' type='text' name='color' ref={colorInputRef} />
                </div>

                <div className="button-container">
                    <button type='submit' onClick={onSubmitHandler}>Enter</button>
                </div>

            </Card>
       </form>
   );
};

export default ParkingInput;