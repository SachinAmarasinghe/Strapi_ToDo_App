import { RouterProvider } from "react-router-dom"
import { setAuthToken } from "./components/setAuthToken";
import Routes from "./Routes"

function App() {
    const token = sessionStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
    return (
        <div className="app">
            <RouterProvider router={Routes} />
        </div>
    )
}

export default App