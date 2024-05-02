import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import reactLogo from "./assets/react.svg";

import viteLogo from "/vite.svg";

import axiosClient from "./config/axios";
import SignIn from "./domains/core/components/sign-in/sign-in.tsx";
import { Login } from "./domains/core/index";
import { UserInfos } from "./domains/user/types";

import "./App.scss";

const A = () => {
    const [count, setCount] = useState(0);
    const [users,setUsers]  = useState([]);
    useEffect(() => {
        axiosClient.get("/user").then((response) => {
            setUsers(response.data);
        });
    }, []);

    return <>
        <div>
            {users.map((user:UserInfos) => (
                <div key={user.id_user}>
                    <p>{user.toString()}</p>
                </div>
            ))}
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
                    <Route path="/home" element={<A/>}/>
                </Route>
                <Route path="/sign-in" element={<SignIn/>}/>
            </Routes>
        </div>

    );
}

export default App;
