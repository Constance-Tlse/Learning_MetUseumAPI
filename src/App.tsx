import { Link, Outlet } from "react-router";
import { useState } from "react";
import DataLivret from "../contexts/DataLivret";
import { PaintingProps } from "../services/types";

import "./App.css";

function App() {
    const [DataOuverture, setDataOuverture] = useState<PaintingProps[]>([]);

    return (
        <DataLivret.Provider value={{ DataOuverture, setDataOuverture }}>
            <nav>
                <Link to="/">L'index</Link>
                <Link to="/+">Aller plus loin</Link>
            </nav>
            <main>
                <Outlet />
            </main>
        </DataLivret.Provider>
    );
}

export default App;