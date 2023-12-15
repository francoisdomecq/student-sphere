import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import reactLogo from "./assets/react.svg";

import viteLogo from "/vite.svg";

import { Login } from "./domains/core/index";

import "./App.scss";

const A = () => {
    const [count, setCount] = useState(0);

    return <>
        <div>
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                <img src={viteLogo} className="logo" alt="Vite logo"/>
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
                <img src={reactLogo} className="logo react" alt="React logo"/>
            </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>
                count is {count}
            </button>
            <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
        <p className="read-the-docs">
            Click on the Vite and React logos to learn more
        </p></>;
};

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}>
                    <Route path="/" element={<A/>}/>
                </Route>
            </Routes>
        </div>

    );
}

export default App;
