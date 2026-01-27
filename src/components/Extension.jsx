import React from 'react';
import {useState,useRef} from 'react';
import './Extension.css';

function Extension({logo,name,description,isActive,onRemoveBtnClick=null}) {
    const removeBtn=useRef(null);
    return (
        <div className="container__extension">
            <img src={logo} alt="extension logo" />
            <h3>{name}</h3>
            <p>{description}</p>
            <input type="checkbox" id="btnToggle" name="btnToggle" />
            <button ref={removeBtn} className="wide-btn" onClick={() => {
                onRemoveBtnClick();
                removeBtn.current.blur();
            }}>Remove</button>
        </div>
    )
}

export default Extension;