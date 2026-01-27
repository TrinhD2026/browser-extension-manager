import {useState, useEffect} from 'react';
import './App.css';
import Extension from './components/Extension.jsx';
import extensions from "./data.json" with {type: "json"};

function App() {
    const [themeImg,setThemeImg]=useState("/icon-moon.svg");
    /*extensions.splice(0,0);*/
    return (
        <div className="darkmode">
            <div className="container__header">
                <img src="/logo.svg" />
                <button className="theme-btn">
                    <img src={themeImg} alt="theme image"/>
                </button>
            </div>
            <div className="container__main-content">
                <h1>Extensions List</h1>
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
                                    {/*<div>*/}
                                    {/*    <img src={data["logo"]} alt="extension logo" />*/}
                                    {/*    <h3>{data["name"]}</h3>*/}
                                    {/*    <p>{data["description"]}</p>*/}
                                    {/*    <input type="checkbox" id="btnToggle" name="btnToggle" />*/}
                                    {/*    <button className="wide-btn">Remove</button>*/}
                                    {/*</div>*/}
                                    <Extension logo={data["logo"]}
                                        name={data["name"]}
                                        description={data["description"]}
                                        isActive={data["isActive"]} />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default App
