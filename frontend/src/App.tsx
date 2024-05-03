import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import reactLogo from "./assets/react.svg";

import viteLogo from "/vite.svg";

import axiosClient from "./config/axios";
import { AppContext } from "./config/contexts/app-context.tsx";
import HomePage from "./domains/core/components/home-page/home-page.tsx";
import { Login, SignIn } from "./domains/user";
import { UserInfos } from "./domains/user/types";

import "./App.scss";

const A = () => {
    const [count, setCount] = useState(0);
    const [users, setUsers] = useState([]);
    const { userInfo } = useContext(AppContext);
    useEffect(() => {
        axiosClient.get("/user").then((response) => {
            setUsers(response.data);
        });
        axiosClient.get(`/establishment/${userInfo.establishmentId}`).then((response) => {
            console.log(response.data);
        });
    }, []);

    return <HomePage>
        <div>
            {users.map((user: UserInfos) => (
                <div key={user.username}>
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
        </p></HomePage>;
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
