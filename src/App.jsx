import {useState,useRef, useEffect, useMemo} from 'react';
import './App.css';
import Extension from './components/Extension.jsx';
import extensions from "./data.json" with {type: "json"};

function App() {
    const [theme,setTheme]=useState(localStorage.getItem('theme'));
    const [themeImg,setThemeImg]=useState(theme==="dark"? "/icon-sun.svg":"/icon-moon.svg");
    const [appLogo,setAppLogo]=useState(theme==="dark"? "/logo-dark.svg":"/logo.svg");
    const [filter,setFilter]=useState("all");

    const [allFilterClass,setAllFilterClass]=useState("filter-label");
    const [activeFilterClass,setActiveFilterClass]=useState("filter-label");
    const [inactiveFilterClass,setInactiveFilterClass]=useState("filter-label");
    const [containerClass,setContainerClass]=useState(theme==="dark" ? "container dark" : "container");

    const themeBtn=useRef(null);

    const filteredItems=useMemo(() => {
        console.log("filter changed");
        setAllFilterClass(filter==="all"? "filter-label filter-label__selected":"filter-label");
        setActiveFilterClass(filter==="active"? "filter-label filter-label__selected":"filter-label");
        setInactiveFilterClass(filter==="inactive"? "filter-label filter-label__selected":"filter-label");
        if(filter==="all") {
            return [...extensions];
        }
        else if(filter==="active") {
            return extensions.filter(e => e['isActive']===true);
        }
        else {
            return extensions.filter(e => e['isActive']!==true);
        }
    },[filter]);

    console.log("app rendering");
    function switchTheme() {
        const newTheme=theme==='light' ? 'dark':'light';
        const newThemeImg=newTheme==='light'? "/icon-moon.svg":"/icon-sun.svg";
        setThemeImg(newThemeImg);
        setTheme(newTheme);
        setContainerClass(newTheme==='light'? "container":"container dark");
        setAppLogo(newTheme === 'light' ? '/logo.svg' : 'logo-dark.svg');
        localStorage.setItem('theme',newTheme);
        themeBtn.current.blur();
    }

    //function toggleIsActive(extensionName) {
    //    const selected=extensions.find(e => e['name']===extensionName);
    //    selected['isActive']= !selected['isActive'];
    //}

    /*extensions.splice(0,0);*/
    return (
        <div className={containerClass} data-theme={theme}>
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
                        <label className={allFilterClass}>
                            <input type="radio" name="filter" value="all" checked={filter==="all"} onClick={() => setFilter("all")} />
                            All
                        </label>
                        <label className={activeFilterClass}>
                            <input type="radio" name="filter" value="active" checked={filter==="active"} onClick={() => setFilter("active")} />
                            Active
                        </label>
                        <label className={inactiveFilterClass}>
                            <input type="radio" name="filter" value="inactive" checked={filter==="inactive"} onClick={() => setFilter("inactive")} />
                            Inactive
                        </label>
                    </div>
                </div>

                <ul className="container__extension-list">
                    {
                        filteredItems.map((data) => {
                            return (
                                <li key={data["name"]}>
                                    <Extension logo={data["logo"]}
                                        name={data["name"]}
                                        description={data["description"]} />
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
