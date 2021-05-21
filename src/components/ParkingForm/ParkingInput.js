import React, { useRef, useContext } from 'react';

import Card from '../UI/Card';
import ParkingSlotsContext from "../../store/parking-slots-context";

const ParkingInput = (props) => {

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

   return (
       <form className="form">
            <Card>
                <div className="input">
                    <label htmlFor='entry-point'>Entry Point</label>
                    <select name="entry-point" id="entry-point" ref={entryPointInputRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <div className="input">
                    <label htmlFor='plate-number'>Plate number</label>
                    <input id='plate-number' type='text' name='plate-number' ref={plateNumberInputRef} />
                </div>

                <div className="input">
                    <label htmlFor='type'>Type</label>
                    <select name="type" id="type" ref={typeInputRef}>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                </div>

                <div className="input">
                    <label htmlFor='color'>Color</label>
                    <input id='color' type='text' name='color' ref={colorInputRef} />
                </div>

                <button type='submit' onClick={onSubmitHandler}>Add</button>
            </Card>
       </form>
   );
};

export default ParkingInput;