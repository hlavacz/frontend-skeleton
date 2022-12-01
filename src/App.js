import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./modules/Login/Login";
import Api from "./libs/Api/Api";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function App() {
    const api = new Api();

    if (api.user.logged) {
        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={'*'} element={<div>logged</div>} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        );
    } else {
        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={'*'} element={<Login api={api}/>} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        )
    }

}

export default App;
