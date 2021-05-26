import React, { useContext, useRef } from 'react';

import ParkingLotContext from "../../store/parking-lot-context";
import Card from '../UI/Card';
import ErrorModal from "../UI/ErrorModal";

const ParkingInput = () => {

    const parkingLotContext = useContext(ParkingLotContext);

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
        parkingLotContext.updateEntryPoint(event.target.value);
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
        return !(!entryPoint || !entryPoint.match(/^[0-9]+$/) || entryPoint > parkingLotContext.entryOrExitQuantity);
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

            parkingLotContext.enter(form);

            plateNumberRef.current.value = '';
            colorRef.current.value = '';
        }
    };

    const entryPointOptions = [];

    for (let i = 1; i <= parkingLotContext.entryOrExitQuantity; i++) {
        entryPointOptions.push(<option value={i} key={i}>{i}</option>);
    }

    const closeErrorHandler = () => {
        parkingLotContext.clearError();
    };

   return (
       <form className="form">
            <Card>
                <div className="input">
                    <label htmlFor='entry-point' className="entry-point">Entry Point</label>
                    <select id="entry-point" name="entry-point" className="entry-point entry-point-select"
                            value={parkingLotContext.currentEntryPoint}
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
           {parkingLotContext.error && <ErrorModal
               onClose={closeErrorHandler}
               message={parkingLotContext.error}
           />}
       </form>
   );
};

export default ParkingInput;