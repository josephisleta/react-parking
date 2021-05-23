import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
    return (
        <div className="backdrop" onClick={props.onClose} />
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(
                <div className="modal">{props.children}</div>,
                portalElement
            )}
        </>
    );
};

export default Modal;