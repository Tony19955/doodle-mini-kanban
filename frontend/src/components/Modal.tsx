import './Modal.css';

import clsx from 'clsx';
import ReactDOM from 'react-dom';
import React, { FC, useEffect, useRef } from 'react';
import useClickOutside from '../utils/useClickOutside';

// Piece of my personal library
const Modal: FC<any> = ({ isModalOpen, setModalOpen, black, fullHeight, fullWidth, crossClose, clickOutsideClose, overlay, children }) => {

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isModalOpen]);
 
  const ref = useRef<HTMLHeadingElement>(null);

  useClickOutside(ref, () => {
    if (isModalOpen) {
      setModalOpen(false);
    }
  });

  return ReactDOM.createPortal(
    <div 
      className={clsx('modal-overlay', {
        'open': isModalOpen,
        'faded-background': overlay
    })}>
      <div 
        ref={clickOutsideClose ? ref : null}
        className={clsx('modal-container', {
          'full-width': fullWidth,
          'full-height': fullHeight,
          'background-black': black,
          'background-white': !black,
      })}>
        {crossClose ? (
          <button className="modal-close-button" onClick={() => setModalOpen(false)}>
            Close
          </button>
        ) : null}
        {children}
      </div>
    </div>,
    document.getElementById('root-modal') as HTMLElement
  );
}

export default Modal;