import React from 'react'
import { RouterProvider } from "react-router-dom"
import { setAuthToken } from "./components/setAuthToken";
import Routes from "./Routes"
import { ConfigProvider } from 'antd';

const App = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
    return (
        <ConfigProvider
            theme={{ token: { colorPrimary: '#3a0ca3', borderRadius: 3 } }}>
            <div className="app">
                <RouterProvider router={Routes} />
            </div>
        </ConfigProvider>
    )
}

export default App