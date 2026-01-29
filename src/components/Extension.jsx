import React from 'react';
import {useState,useRef} from 'react';
import './Extension.css';

function Extension({logo,name,description, active, toggleIsActive=null, removeExtension=null}) {
    const removeBtn=useRef(null);
    const activeBtn=useRef(null);

    const [isActive,setIsActive]=useState(active);
    function handleToggleActive() {
        setIsActive(!isActive);
        toggleIsActive();
    }
    return (
        <div className="container__extension">
            <div className="container__extension-review">
                <img src={logo} alt="extension logo" />
                <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div className="container__buttons">
                <button ref={removeBtn} className="wide-btn" onClick={() => {
                    removeExtension();
                    removeBtn.current.blur();
                }}>Remove</button>
                <button ref={activeBtn} className={`toggle-btn ${isActive? 'toggled':''}`} onClick={() => {
                    handleToggleActive();
                    activeBtn.current.blur();
                }}>
                    <div className="thumb"></div>
                </button>
            </div>
        </div>
    )
}

export default Extension;