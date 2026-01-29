import {useState,useRef, useMemo} from 'react';
import './App.css';
import Extension from './components/Extension.jsx';
import data from "./data.json" with {type: "json"};

function App() {
    const [extensions,setExtensions]=useState([...data]);
    const [theme,setTheme]=useState(localStorage.getItem('theme'));
    const [themeImg,setThemeImg]=useState(theme==="dark"? "/icon-sun.svg":"/icon-moon.svg");
    const [appLogo,setAppLogo]=useState(theme==="dark"? "/logo-dark.svg":"/logo.svg");
    const [filter,setFilter]=useState("all");

    const themeBtn=useRef(null);
    const allBtn=useRef(null);
    const activeBtn=useRef(null);
    const inactiveBtn=useRef(null);

    const filteredItems=useMemo(() => {
        console.log("filtering items");
        if(filter==="all") {
            return [...extensions];
        }
        else if(filter==="active") {
            return extensions.filter(e => e['isActive']===true);
        }
        else {
            return extensions.filter(e => e['isActive']!==true);
        }
    },[filter,extensions]);

    console.log("app rendering");

    function switchTheme() {
        const newTheme=theme==='light' ? 'dark':'light';
        const newThemeImg=newTheme==='light'? "/icon-moon.svg":"/icon-sun.svg";
        setThemeImg(newThemeImg);
        setTheme(newTheme);
        setAppLogo(newTheme === 'light' ? '/logo.svg' : 'logo-dark.svg');
        localStorage.setItem('theme',newTheme);
        themeBtn.current.blur();
    }

    function toggleIsActive(extensionName) {
        const selected=extensions.find(e => e['name']===extensionName);
        selected['isActive']=!selected['isActive'];

    }

    function removeExtension(extensionName) {
        setExtensions(extensions.filter((ext) => ext["name"]!==extensionName)); // Creates a new array
    }

    return (
        <div className={`container ${theme === 'dark' ? 'dark': ''}`} data-theme={theme}>
            <div className="container__header">
                <img src={appLogo} alt="application logo" className="app-logo" />
                <button className="theme-btn" onClick={switchTheme} ref={themeBtn}>
                    <img src={themeImg} alt="theme image"/>
                </button>
            </div>
            <div className="container__main-content">
                <div className="container__main-content-header">
                    <h1>Extensions List</h1>
                    <div className="container__filters">
                        <button ref={allBtn} className={`wide-btn ${filter==="all"? "wide-btn__selected":""}`} onClick={() => {
                            setFilter("all");
                            allBtn.current.blur();
                        }}>All</button>
                        <button ref={activeBtn} className={`wide-btn ${filter==="active"? "wide-btn__selected":""}`} onClick={() => {
                            setFilter("active");
                            activeBtn.current.blur();
                        }}>Active</button>
                        <button ref={inactiveBtn} className={`wide-btn ${filter==="inactive"? "wide-btn__selected":""}`} onClick={() => {
                            setFilter("inactive");
                            inactiveBtn.current.blur();
                        }}>Inactive</button> 
                    </div>
                </div>

                <ul className="container__extension-list">
                    {
                        filteredItems.map((data) => {
                            return (
                                <li key={data["name"]}>
                                    <Extension logo={data["logo"]}
                                        name={data["name"]}
                                        description={data["description"]}
                                        active={data["isActive"]}
                                        toggleIsActive={() => {toggleIsActive(data["name"])}}
                                        removeExtension={() => {removeExtension(data["name"])}} />
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
