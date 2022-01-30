import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./modules/Login/Login";
import Api from "./libs/Api/Api";

function App() {
    const api = new Api();

    if (api.user.logged) {
        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path={'*'} element={<div>logged</div>} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    } else {
        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path={'*'} element={<Login api={api}/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }

}

export default App;
