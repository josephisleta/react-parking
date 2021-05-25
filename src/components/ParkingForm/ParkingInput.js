import React, { useContext, useRef } from 'react';

import ParkingSlotsContext from "../../store/parking-slots-context";
import Card from '../UI/Card';

const ParkingInput = () => {

    const parkingSlotsContext = useContext(ParkingSlotsContext);

    const entryPointRef = useRef();
    const plateNumberRef = useRef();
    const typeRef = useRef();
    const colorRef = useRef();

    const changeEntryPointHandler = (event) => {
        if (!isValidEntryPoint(event.target.value)) {
            entryPointRef.current.className = 'entry-point entry-point-select error';
        } else {
            entryPointRef.current.className = 'entry-point entry-point-select';
        }
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
        if (!isValidType(event.target.value)) {
            typeRef.current.className = 'error';
        } else {
            typeRef.current.className = '';
        }
    };

    const changeColorHandler = (event) => {
        if (!isValidColor(event.target.value)) {
            colorRef.current.className = 'error color-input';
        } else {
            colorRef.current.className = 'color-input';
        }
    };

    const validateForm = () => {
        let formIsValid = true;

        if (!isValidEntryPoint(entryPointRef.current.value)) {
            formIsValid = false;
            entryPointRef.current.className = 'error';
        }

        if (!isValidPlateNumber(plateNumberRef.current.value)) {
            formIsValid = false;
            plateNumberRef.current.className = 'error';
        }

        if (!isValidType(typeRef.current.value)) {
            formIsValid = false;
            typeRef.current.className = 'error';
        }

        if (!isValidColor(colorRef.current.value)) {
            formIsValid = false;
            colorRef.current.className = 'error';
        }

        return formIsValid;
    };

    const isValidEntryPoint = (entryPoint) => {
        return !(!entryPoint || !entryPoint.match(/^[0-9]+$/) || entryPoint > parkingSlotsContext.entryOrExitQuantity);
    };

    const isValidPlateNumber = (plateNumber) => {
        return !(!plateNumber || !plateNumber.match(/^[a-zA-Z0-9]+$/));
    };

    const isValidType = (type) => {
        return !(!type || !type.match(/^[S|M|L]$/));
    };

    const isValidColor = (color) => {
        return !(!color.match(/^[a-zA-Z ]*$/));
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
                <div className="input">
                    <label htmlFor='entry-point' className="entry-point">Entry Point</label>
                    <select id="entry-point" name="entry-point" className="entry-point entry-point-select"
                            value={parkingSlotsContext.currentEntryPoint}
                            ref={entryPointRef}
                            onChange={changeEntryPointHandler}>
                        {entryPointOptions}
                    </select>

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
                    <input id='color' type='text' name='color' className="color-input"
                           ref={colorRef}
                           onChange={changeColorHandler}/>

                    <div className="button-container">
                        <button type='submit' onClick={onSubmitHandler}>Enter</button>
                    </div>
                </div>
            </Card>
       </form>
   );
};

export default ParkingInput;