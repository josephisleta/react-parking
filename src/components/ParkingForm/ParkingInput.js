import React, { useContext, useRef } from 'react';

import Card from '../UI/Card';
import ParkingSlotsContext from "../../store/parking-slots-context";

const ParkingInput = () => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    const entryPointRef = useRef();
    const plateNumberRef = useRef();
    const typeRef = useRef();
    const colorRef = useRef();

    const changeEntryPointHandler = (event) => {
        parkingSlotsContext.updateEntryPoint(event.target.value);
    };

    const changePlateNumberHandler = (event) => {
        if (!isValidPlateNumber(event.target.value)) {
            plateNumberRef.current.className = 'error';
        } else {
            plateNumberRef.current.className = '';
        }
    };

    const changeTypeHandler = (event) => {

    };

    const changeColorHandler = (event) => {
        if (!event.target.value) {
            colorRef.current.className = 'error';
        } else {
            colorRef.current.className = '';
        }
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!isValidPlateNumber(plateNumberRef.current.value)) {
            formIsValid = false;
            errors["plateNumber"] = "Please enter a valid plate number.";
            plateNumberRef.current.className = 'error';
        }

        if (!isValidColor(colorRef.current.value)) {
            formIsValid = false;
            errors["color"] = "Please enter a valid color.";
            colorRef.current.className = 'error';
        }

        return formIsValid;
    };

    const isValidPlateNumber = (plateNumber) => {
        return !(!plateNumber || !plateNumber.match(/^[a-zA-Z0-9]+$/));
    };

    const isValidColor = (color) => {
        return !(!color || !color.match(/^[a-zA-Z ]+$/));
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (validateForm()) {
            const form = {
                'entryPoint': entryPointRef.current.value,
                'plateNumber': plateNumberRef.current.value,
                'type': typeRef.current.value,
                'color': colorRef.current.value
            };

            parkingSlotsContext.enter(form);

            plateNumberRef.current.value = '';
            colorRef.current.value = '';
        }
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
                            value={parkingSlotsContext.currentEntryPoint}
                            ref={entryPointRef}
                            onChange={changeEntryPointHandler}>
                        {entryPointOptions}
                    </select>
                </div>

                <div className="input">
                    <label htmlFor='plate-number'>Plate number</label>
                    <input id='plate-number' type='text' name='plate-number'
                           ref={plateNumberRef}
                           onChange={changePlateNumberHandler} />

                    <label htmlFor='type'>Type</label>
                    <select name="type" id="type" ref={typeRef} onChange={changeTypeHandler}>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>

                    <label htmlFor='color'>Color</label>
                    <input id='color' type='text' name='color'
                           ref={colorRef}
                           onChange={changeColorHandler}
                    />
                </div>

                <div className="button-container">
                    <button type='submit' onClick={onSubmitHandler}>Enter</button>
                </div>

            </Card>
       </form>
   );
};

export default ParkingInput;