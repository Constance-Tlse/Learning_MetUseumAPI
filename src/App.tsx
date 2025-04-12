import { Link, Outlet } from "react-router";

import "./App.css";

function App() {
    return (
        <>
            <nav>
                <Link to="/">L'index</Link>
                <Link to="/+">Aller plus loin</Link>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
