import React from 'react'
import classes from './Modal.module.css'
import Backdrop from '../BackDrop/BackDrop';

const Modal = (props) => (
    <>
        <Backdrop show={props.show} clicked={props.modalclosed} />
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </>
);

export default Modal;


