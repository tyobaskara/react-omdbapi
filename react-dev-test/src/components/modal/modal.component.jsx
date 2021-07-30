import React from 'react';

import './modal.styles.scss';

const Modal = (props) => {
  return (
    <div className='modal'>
      <div 
        className='overlay' 
        onClick={props.onCloseModal}  
      />
      <div className='modal-container'>
        <button 
          className='modal-close'
          onClick={props.onCloseModal}
        >
          <i className="fa fa-close"></i>
        </button>

        {props.children}
      </div>
    </div>
  );
};

export default Modal;
