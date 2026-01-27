import {useState, useEffect} from 'react';
import './App.css';
import extensions from "./data.json" with {type: "json"};

function App() {
    const [themeImg,setThemeImg]=useState("/icon-moon.svg");
    /*extensions.splice(0,0);*/
    return (
        <>
            <div className="container__header">
                <h1><img src="/logo.svg" /></h1>
                <button className="wide-btn">
                    <img src={themeImg} alt="theme image"/>
                </button>
            </div>
            <div className="container__main-content">
                <h2>Extensions List</h2>
                <div className="container__filters">
                    <button className="wide-btn">All</button>
                    <button className="wide-btn">Active</button>
                    <button className="wide-btn">Inactive</button>
                </div>
                <ul>
                    {
                        extensions.map((data) => {
                            return (
                                <li key={data["name"]}>
                                    <div>
                                        <img src={data["logo"]} alt="extension logo" />
                                        <h3>{data["name"]}</h3>
                                        <p>{data["description"]}</p>
                                        <input type="checkbox" id="btnToggle" name="btnToggle" />
                                        <button className="wide-btn">Remove</button>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default App
